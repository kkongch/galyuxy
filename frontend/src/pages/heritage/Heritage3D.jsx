import React, { Suspense, useEffect } from 'react';
import { OrbitControls, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { styled } from 'styled-components';
import { useThree } from '@react-three/fiber';
import { useNavigate, useParams } from 'react-router-dom';
import { Goldcrown } from 'components/Heritage/models/Goldcrown';
import { HemisphericalSundial } from 'components/Heritage/models/HemisphericalSundial';
import { Jagyeongru } from 'components/Heritage/models/Jagyeongru';
import { Stone } from 'components/Heritage/models/stone';
import { Flag } from 'components/Heritage/models/Flag';

const Background = styled.div`
  background-color: black;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20rem;
`;
const BackgroundBox = styled.div`
  /* position: relative; */
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  z-index: 1;
`;
const Heritage3dBox = styled.div`
  height: 100%;
  width: 100%;
`;
const ButtonBox = styled.div`
  margin-bottom: 12rem;
  margin-right: 6rem;
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  z-index: 6;
`;
const BackButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 22.5rem;
  height: 7.5rem;
  border-radius: 3.75rem;
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.25);
  background-color: #d9d9d9;
  font-size: 2.5rem;
  text-align: center;
  padding: 0 3.5rem;
  font-weight: 700;
  cursor: pointer;
`;
const SvgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 4.6875rem;
`;
const ARbutton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 22.5rem;
  height: 7.5rem;
  border-radius: 3.75rem;
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.25);
  background-color: #d9d9d9;
  font-size: 2.5rem;
  font-weight: 700;
  margin-left: 3rem;
  padding: 0 3.5rem;
  cursor: pointer;
`;
const CameraController = ({ x, y, z }) => {
  const { camera, gl } = useThree();
  camera.position.set(x, y, z);
  useEffect(() => {
    console.log(camera.position);
  }, []);
  gl.setSize(window.innerWidth, window.innerHeight);
  return null;
};

const Heritage3D = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    console.log('click');
    navigate(`/heritage/${id}`);
  };
  const handleCameraClick = () => {
    navigate(`/heritage/${id}/3d/heritagecamera`);
  };
  return (
    <Background>
      <BackgroundBox>
        <Heritage3dBox>
          <Canvas>
            <OrbitControls
              enableZoom={true}
              zoomSpeed={1.2}
              target={[0, 0.6, 0]}
            />
            {/* <axesHelper args={[500, 500, 500]} /> */}
            <directionalLight />
            <Suspense fallback={null}>
              {id === '16' ? (
                <>
                  <Goldcrown props={props} />
                  <CameraController x={4} y={1} z={6} />
                  <ambientLight intensity={20} />
                  <Preload all />
                </>
              ) : id === '27' ? (
                <>
                  <HemisphericalSundial props={props} />
                  <CameraController x={2} y={1} z={2} />
                  <ambientLight intensity={20} />
                </>
              ) : id === '28' ? (
                <>
                  <Jagyeongru props={props} />
                  <CameraController x={0} y={0} z={0} />
                  <ambientLight intensity={2} />
                </>
              ) : id === '69' ? (
                <>
                  <Stone props={props} />
                  <CameraController x={0.8} y={1} z={2.2} />
                  <ambientLight intensity={2} />
                </>
              ) : (
                <>
                  <Flag props={<h1>로딩중</h1>} />
                  <ambientLight intensity={2} />
                </>
              )}
            </Suspense>
          </Canvas>
        </Heritage3dBox>
      </BackgroundBox>
      <ButtonBox>
        <BackButton onClick={handleBackClick}>
          <SvgBox>
            <svg
              width='76'
              height='75'
              viewBox='0 0 76 75'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6.52344 37.5C6.52344 54.75 20.601 68.75 37.9466 68.75C55.2921 68.75 69.3697 54.75 69.3697 37.5C69.3697 20.25 55.2921 6.25 37.9466 6.25C20.601 6.25 6.52344 20.25 6.52344 37.5ZM63.0851 37.5C63.0851 51.3125 51.8356 62.5 37.9466 62.5C24.0575 62.5 12.8081 51.3125 12.8081 37.5C12.8081 23.6875 24.0575 12.5 37.9466 12.5C51.8356 12.5 63.0851 23.6875 63.0851 37.5ZM25.3773 37.5L37.9466 25L42.3772 29.4062L37.4124 34.375H50.5158V40.625H37.4124L42.4087 45.5938L37.9466 50L25.3773 37.5Z'
                fill='black'
              />
            </svg>
          </SvgBox>
          <p>뒤로 가기</p>
        </BackButton>
        <ARbutton onClick={handleCameraClick}>
          <SvgBox>
            <svg
              width='76'
              height='75'
              viewBox='0 0 75 73'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M37.5 30.4167L34.5625 36.6825L28.125 39.5417L34.5625 42.4008L37.5 48.6667L40.4375 42.4008L46.875 39.5417L40.4375 36.6825L37.5 30.4167ZM62.5 15.2083H52.5937L46.875 9.125H28.125L22.4063 15.2083H12.5C9.0625 15.2083 6.25 17.9458 6.25 21.2917V57.7917C6.25 61.1375 9.0625 63.875 12.5 63.875H62.5C65.9375 63.875 68.75 61.1375 68.75 57.7917V21.2917C68.75 17.9458 65.9375 15.2083 62.5 15.2083ZM62.5 57.7917H12.5V21.2917H25.1563L27 19.3146L30.875 15.2083H44.125L48 19.3146L49.8437 21.2917H62.5V57.7917ZM37.5 24.3333C28.875 24.3333 21.875 31.1467 21.875 39.5417C21.875 47.9367 28.875 54.75 37.5 54.75C46.125 54.75 53.125 47.9367 53.125 39.5417C53.125 31.1467 46.125 24.3333 37.5 24.3333ZM37.5 48.6667C32.3438 48.6667 28.125 44.5604 28.125 39.5417C28.125 34.5229 32.3438 30.4167 37.5 30.4167C42.6562 30.4167 46.875 34.5229 46.875 39.5417C46.875 44.5604 42.6562 48.6667 37.5 48.6667Z'
                fill='black'
              />
            </svg>
          </SvgBox>
          <p style={{ marginRight: '2rem' }}>카메라</p>
        </ARbutton>
      </ButtonBox>
    </Background>
  );
};

export default Heritage3D;
