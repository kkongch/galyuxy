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

const CaptureButton = styled.div`
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
  padding: 0 3.5rem;
  font-weight: 700; 
  position: absolute; 
  bottom: 20px;  
  left: 50%; /* 가운데 정렬을 위해 왼쪽 여백을 50%로 설정 */
  transform: translateX(-50%); /* 가운데 정렬을 위해 왼쪽 여백을 요소의 절반만큼 왼쪽으로 이동 */
  cursor: pointer;
`;

const ToggleButton = styled.div`
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
margin-right: 3.06rem;
padding: 0 3.5rem;
font-weight: 700; 
position: absolute; 
bottom: 20px;  
right: 20px; 
cursor: pointer;
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
  };

const ArtCameraPage = () => {
  const navigate = useNavigate();
  const [isFrontCamera, setIsFrontCamera] = useState(true); // 후면 카메라인지 여부를 나타내는 state


  const handleBackClick = () => {
    navigate('/main');
  };

  const handleCameraToggle = () => {
    setIsFrontCamera((prev) => !prev); // 후면 카메라 상태를 토글
  };
  const cameraFacingMode = isFrontCamera ? "user" : { exact: "environment" }; // 후면/전면 카메라에 따른 facingMode 설정

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
       // 파일로 저장
       const downloadLink = document.createElement('a');
       downloadLink.href = imageSrc;
       downloadLink.download = 'captured_image.png'; //파일이름 바꿔야함
       document.body.appendChild(downloadLink);
       downloadLink.click();
       document.body.removeChild(downloadLink);
    },
    [webcamRef]
  );

  return (
    <Background>
      <CameraContainer>
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={true}
          screenshotFormat='image/png'
          videoConstraints={{
            ...videoConstraints,
            facingMode: cameraFacingMode,
          }}
          style={{ width: '100%', height: '1600px' }} //갤탭에서 사진 크기 확인해보고 나중에 변경
        />

        <CaptureButton onClick={capture}>Capture</CaptureButton>
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
        <ToggleButton onClick={handleCameraToggle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75" fill="none">
            <g clipPath="url(#clip0_1522_796)">
              <path d="M50 21.8753H46.875L43.75 18.7503H31.25L28.125 21.8753H25C21.5625 21.8753 18.75 24.6878 18.75 28.1253V46.8753C18.75 50.3128 21.5625 53.1253 25 53.1253H50C53.4375 53.1253 56.25 50.3128 56.25 46.8753V28.1253C56.25 24.6878 53.4375 21.8753 50 21.8753ZM50 46.8753H25V28.1253H30.7187L33.8437 25.0003H41.1563L44.2813 28.1253H50V46.8753Z" fill="black"/>
              <path d="M37.5 43.7503C40.9518 43.7503 43.75 40.9521 43.75 37.5003C43.75 34.0485 40.9518 31.2503 37.5 31.2503C34.0482 31.2503 31.25 34.0485 31.25 37.5003C31.25 40.9521 34.0482 43.7503 37.5 43.7503Z" fill="black"/>
              <path d="M26.7812 1.62531L40.7813 15.6253L45.1875 11.2191L40.375 6.40656C55.3125 7.68781 67.2813 19.5003 68.75 34.3753H75C73 10.3128 49.3437 -5.21844 26.7812 1.62531Z" fill="black"/>
              <path d="M29.8125 63.7816L34.625 68.5941C19.6875 67.3128 7.71875 55.5003 6.25 40.6253H0C2 64.6878 25.6563 80.2191 48.2188 73.3753L34.2187 59.3753L29.8125 63.7816Z" fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_1522_796">
                <rect width="75" height="75" fill="white"/>
              </clipPath>
            </defs>
          </svg>  
        </ToggleButton>
      </CameraContainer>
    </Background>
  );
};

export default ArtCameraPage;
