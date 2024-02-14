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
      </ButtonBox>
    </Background>
  );
};

export default Heritage3D;
