import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import Background from 'components/Basic/Background';

const CameraContainer = styled.div`
  width: 100%;
  position: relative;
`;

const BackButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22.5rem;
  height: 7.5rem;
  border-radius: 3.75rem;
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.25);
  background-color: #d9d9d9;
  font-size: 2.5rem;
  text-align: center;
  margin-left: 3.06rem;
  padding: 0 3.5rem;
  font-weight: 700;
  position: absolute;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
`;
const SvgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 4.6875rem;
`;
const videoConstraints = {
  width: '100%',
  height: '100%',
  // facingMode: "user" //전면카메라
  facingMode: { exact: 'environment' }, // 후면 카메라 : 현재 테스트할 수 없어서 전면으로 설정해둠
};

const StudentLoginCameraPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/login');
  };

  const webcamRef = React.useRef(null);

  return (
    <Background>
      <CameraContainer>
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={true}
          screenshotFormat='image/jpeg'
          videoConstraints={videoConstraints}
          style={{ width: '100%', height: '1600px' }}
        />
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
          뒤로가기
        </BackButton>
      </CameraContainer>
    </Background>
  );
};

export default StudentLoginCameraPage;
