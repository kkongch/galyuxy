import React, { useRef, useMemo, useState, useCallback, Suspense, useEffect, useLayoutEffect} from 'react';
import * as THREE from 'three';
import { Canvas, createPortal, useFrame, useThree, useLoader, useUpdate } from '@react-three/fiber';
import {
  Stats,
  useGLTF,
  Environment,
  OrbitControls,
  Plane,
  Html,
} from '@react-three/drei';
import { useControls } from 'leva';

import clamp from "lodash.clamp";
import * as faceapi from "face-api.js";
// import Model from "assets/images/3dpea";
import Background from 'components/Basic/Background';

import ReactDOM from "react-dom";
import styled from 'styled-components';

export function useWebcam(width, height) {
  const [video, setVideo] = useState();

  useEffect(() => {
    async function init() {
      if (!video) {
        const el = document.createElement("video");
        el.setAttribute("playsinline", "true");
        el.setAttribute("autoplay", "true");
        el.setAttribute("loop", "true");

        el.addEventListener("loadedmetadata", () => setVideo(el), false);
        // document.body.appendChild(el);

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: width },
            height: { ideal: height }
          },
          audio: false
        });
        el.srcObject = mediaStream;
      }
    }

    init();
  }, [video, width, height]);

  return video;
};

const detectorOptions = new faceapi.TinyFaceDetectorOptions({
  inputSize: 416,
  scoreThreshold: 0.1
});
export function useFaceTracking(videoElement) {
  const resultsRef = useRef(null);

  useEffect(() => {
    async function loop() {
      resultsRef.current = await faceapi.detectSingleFace(videoElement, detectorOptions);
      requestAnimationFrame(loop);
    }

    if (videoElement) {
      requestAnimationFrame(loop);
    }
  }, [videoElement]);

  return resultsRef;
};


function PlanePortal({ width, height }) {
  const planeRef = useRef();

  const [camera] = useState(new THREE.PerspectiveCamera());

  const { near, scene, target, portalHalfWidth, portalHalfHeight } = useMemo(() => {
    const target = new THREE.WebGLRenderTarget(1024, 1024);
    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x000000);

    const near = 0.1;
    const portalHalfWidth = width / 2;
    const portalHalfHeight = height / 2;

    return { near, scene, target, portalHalfWidth, portalHalfHeight };
  }, [width, height]);

  useFrame((state) => {
    camera.position.copy(state.camera.position);
    camera.quaternion.copy(planeRef.current.quaternion);

    const portalPosition = new THREE.Vector3().copy(planeRef.current.position);

    camera.updateMatrixWorld();
    camera.worldToLocal(portalPosition);

    const left = portalPosition.x - portalHalfWidth;
    const right = portalPosition.x + portalHalfWidth;
    const top = portalPosition.y + portalHalfHeight;
    const bottom = portalPosition.y - portalHalfHeight;

    const distance = Math.abs(portalPosition.z);
    const scale = near / distance;

    const scaledLeft = left * scale;
    const scaledRight = right * scale;
    const scaledTop = top * scale;
    const scaledBottom = bottom * scale;

    camera.projectionMatrix.makePerspective(
      scaledLeft,
      scaledRight,
      scaledTop,
      scaledBottom,
      near,
      100
    );

    state.gl.render(scene, camera);
  }, 1);

  return (
    <>
      {/* {createPortal(<DepthCube width={width} height={height} />, scene)} */}
      <Plane ref={planeRef}>
        <meshBasicMaterial attach="material" map={target.texture} />
      </Plane>
    </>
  );
}


function LPF(arr, nextValue, smoothing = 0.4, bufferMaxSize = 64) {
  const removed = arr.length === bufferMaxSize ? arr.shift() : 0;
  arr.push(nextValue);
  const result = arr.reduce(
    (last, current) => smoothing * current + (1 - smoothing) * last,
    removed
  );
  arr[arr.length - 1] = result;
  return result;
};

function InteractionManager({ isMobile }) {
  const { aspect } = useThree();

  const { width, height } = useMemo(
    () => (aspect > 1 ? { width: 1, height: 1 / aspect } : { width: aspect, height: 1 }),
    [aspect]
  );

  const videoWidth = 640;
  const videoHeight = 480;
  const videoElement = useWebcam(videoWidth, videoHeight);
  const betaTailRef = useRef([]);
  const gammaTailRef = useRef([]);
  const zetaTailRef = useRef([]);
  const resultsRef = useFaceTracking(videoElement);

  const [clicked, setClicked] = useState(!isMobile);
  const handleClick = useCallback(
    function handleClick() {
      if (videoElement) {
        videoElement.play();
        setClicked(true);
      }
    },
    [videoElement, setClicked]
  );

  useFrame(({ camera }) => {
    if (videoElement && clicked) {
      if (resultsRef.current) {
        const box = resultsRef.current.box;
        const px = 0.5 - (box.x + box.width / 2) / videoWidth;
        const py = (box.y + box.height / 2) / videoHeight - 0.5;
        const pz = (box.width / videoWidth + box.height / videoHeight) / 2;

        const beta = -clamp(py * 80, -45 * height, 45 * height);
        const gamma = -clamp(px * 80, -45 * width, 45 * width);

        const filteredBeta = LPF(betaTailRef.current, beta);
        const filteredGamma = LPF(gammaTailRef.current, gamma);
        const filteredZeta = LPF(zetaTailRef.current, pz);

        camera.position.x = -filteredGamma / 90;
        camera.position.y = filteredBeta / 90;
        camera.position.z =
          1 -
          0.5 * Math.min(Math.abs(camera.position.x) + Math.abs(camera.position.y), 1) +
          filteredZeta -
          0.5;
        camera.lookAt(0, 0, 0);
      }
    }
  });

  return  (
    // <PlanePortal width={width} height={height} />
    <PlanePortal width="100%" height={height} />
  ) ;
  // : (
  //   <Plane material-transparent material-opacity={0} onClick={handleClick}>
  //     {/* <Html center scaleFactor={10}>
  //       <div style={{ color: "black", fontFamily: "Fredoka One" }}>Click Here</div>
  //     </Html> */}
  //   </Plane>
  // );
};






const StyledMain = styled.main`
  width: 100vw;
  height: 100vh;
`;
// const Models = [
//   { title: 'Hammer', url: '/models/hammer.glb' },
//   { title: 'Drill', url: '/models/drill.glb' },
//   { title: 'Tape Measure', url: '/models/tapeMeasure.glb' },
//   { title: 'Gold crown', url: '/goldcrown.gltf' },
//   { title: 'jagyeongryu', url: '/Jagyeongryu.gltf' },
//   { title: 'stone', url: '/stone.gltf' },
// ];

// function Model({ url }) {
//   const { scene } = useGLTF(url);
//   const [cache, setCache] = useState({});

//   if (!cache[url]) {
//     const annotations = [];

//     scene.traverse((o) => {
//       if (o.userData.prop) {
//         annotations.push(
//           <Html
//             key={o.uuid}
//             position={[o.position.x, o.position.y, o.position.z]}
//             distanceFactor={0.25}
//           >
//             <div className='annotation'>{o.userData.prop}</div>
//           </Html>
//         );
//       }
//     });

//     console.log('Caching JSX for url ' + url);
//     setCache({
//       ...cache,
//       [url]: <primitive object={scene}>{annotations}</primitive>,
//     });
//   }
//   return cache[url];
// }

const TestPage = () => {
  useEffect(() => {}, []);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    async function load() {
      await faceapi.nets.tinyFaceDetector.load("model-weights_manifest.json");

      setLoaded(true);
    }
    load();
  }, []);
  // function CoinMesh() {
  //   const mesh = useRef(null);
  //   useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.z += 0.01));
  //   return (
  //     <mesh ref={mesh} scale={0.7}>
  //       <cylinderBufferGeometry args={[1, 1, 0.3, 50]} />
  //       <meshLambertMaterial attach='material' color='#ff9800' />
  //     </mesh>
  //   );
  // }

  // const { title } = useControls({
  //   title: {
  //     options: Models.map(({ title }) => title),
  //   },
  // });

  // const { model } = useControls({
  //   model: {
  //     value: 'Gold crown',
  //     options: Object.keys(Models),
  //   },
  // });

  return (
    <StyledMain className='main'>
      {/* <Canvas>
        <Environment files='/img/workshop_1k.hdr' background />
        <group>
          <Model url={Models[Models.findIndex((m) => m.title === title)].url} />
        </group>
        <OrbitControls autoRotate />
        <Stats /> */}

      {/* <Suspense
          fallback={
            <Html center>
                <Background
                  width="15rem"
                  text="Loading..."
                  fontSize="1.5rem"
                />
            </Html>
          }
        >
          <Model />
          <OrbitControls /> */}
      {/* <Environment preset="forest" background /> */}
      {/* <Environment files="assets/images/jpgtest.jpg" background /> */}
      {/* </Suspense> */}
      {/* </Canvas> */}

      <>
      {loaded && faceapi.nets.tinyFaceDetector.params && (
        <Canvas
          // concurrent={true}
          // shadowMap
          // colorManagement={true}
          // pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
          camera={{ position: [0, 0, 1], far: 100, near: 0.1 }}
        >
          <Suspense fallback={null}>
            <InteractionManager isMobile={isMobile} />
          </Suspense>
        </Canvas>
      )}
    </>
    </StyledMain>
  );
};

export default TestPage;
