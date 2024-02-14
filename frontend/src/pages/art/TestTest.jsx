// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
// import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// const TestPage = () => {
//   const canvasRef = useRef();

//   useEffect(() => {
//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       canvas: canvasRef.current,
//     });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.toneMapping = THREE.ACESFilmicToneMapping;

//     const camera = new THREE.PerspectiveCamera(
//       60,
//       window.innerWidth / window.innerHeight,
//       1,
//       100
//     );
//     camera.position.z = 5;

//     const scene = new THREE.Scene();
//     scene.scale.x = -1;

//     const environment = new RoomEnvironment(renderer);
//     const pmremGenerator = new THREE.PMREMGenerator(renderer);

//     scene.background = new THREE.Color(0x666666);
//     scene.environment = pmremGenerator.fromScene(environment).texture;

//     const controls = new OrbitControls(camera, renderer.domElement);

//     const ktx2Loader = new KTX2Loader()
//       .setTranscoderPath('jsm/libs/basis/')
//       .detectSupport(renderer);

      

//     const gltfLoader= new GLTFLoader()
//       .setKTX2Loader(ktx2Loader)
//       .setMeshoptDecoder(MeshoptDecoder)
//       .load('assets/images/facecap.glb', (gltf) => {
//         const mesh = gltf.scene.children[0];
//         scene.add(mesh);

//         const head = mesh.getObjectByName('mesh_2');
//         head.material = new THREE.MeshNormalMaterial();

//         const gui = new GUI();
//         gui.close();

//         const influences = head.morphTargetInfluences;

//         for (const [key, value] of Object.entries(head.morphTargetDictionary)) {
//           gui
//             .add(influences, value, 0, 1, 0.01)
//             .name(key.replace('blendShape1.', ''))
//             .listen(influences);
//         }

//         renderer.setAnimationLoop(animation);
//       });

//     const video = document.createElement('video');
//     const texture = new THREE.VideoTexture(video);
//     texture.colorSpace = THREE.SRGBColorSpace;

//     const geometry = new THREE.PlaneGeometry(1, 1);
//     const material = new THREE.MeshBasicMaterial({
//       map: texture,
//       depthWrite: false,
//     });
//     const videomesh = new THREE.Mesh(geometry, material);
//     scene.add(videomesh);

//     const animation = () => {
//       if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
//         // MediaPipe
//         // const results = faceLandmarker.detectForVideo(video, Date.now());
//         // if (results.facialTransformationMatrixes.length > 0) {
//         //   const facialTransformationMatrixes = results.facialTransformationMatrixes[0].data;
//         //   transform.matrix.fromArray(facialTransformationMatrixes);
//         //   transform.matrix.decompose(transform.position, transform.quaternion, transform.scale);
//         //   const object = scene.getObjectByName('grp_transform');
//         //   object.position.x = transform.position.x;
//         //   object.position.y = transform.position.z + 40;
//         //   object.position.z = -transform.position.y;
//         //   object.rotation.x = transform.rotation.x;
//         //   object.rotation.y = transform.rotation.z;
//         //   object.rotation.z = -transform.rotation.y;
//         // }
//         // if (results.faceBlendshapes.length > 0) {
//         //   const face = scene.getObjectByName('mesh_2');
//         //   const faceBlendshapes = results.faceBlendshapes[0].categories;
//         //   for (const blendshape of faceBlendshapes) {
//         //     const categoryName = blendshape.categoryName;
//         //     const score = blendshape.score;
//         //     const index = face.morphTargetDictionary[blendshapesMap[categoryName]];
//         //     if (index !== undefined) {
//         //       face.morphTargetInfluences[index] = score;
//         //     }
//         //   }
//         // }
//       }

//       videomesh.scale.x = video.videoWidth / 100;
//       videomesh.scale.y = video.videoHeight / 100;

//       renderer.render(scene, camera);
//       controls.update();
//     }

//     window.addEventListener('resize', function () {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     });

//     return () => {
//       renderer.dispose();
//       pmremGenerator.dispose();
//     };
//   }, []);

//   return (<canvas ref={canvasRef}></canvas>);
// };

// export default TestPage;
