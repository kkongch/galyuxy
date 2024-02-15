import React, { useRef, useState, useEffect } from 'react';
import { artworkState, artworkARState } from 'Recoil/ArtworkState';
import { useRecoilState } from 'recoil';
import { createRoot } from 'react-dom/client';
import { useNavigate } from 'react-router';
import { Stage, Layer, Line, Text, Image, Rect } from 'react-konva';
import useImage from 'use-image';
import Gimage from 'assets/images/Geobukseon.PNG';
import Konva from 'konva';
import styled from 'styled-components';
import backgroundImage from 'assets/images/Art/artbackgroundimage.png';
import Background from 'components/Basic/Background';

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  position: fixed; /* 위치 고정 */
  bottom: 20px; /*화면 하단에서 20px 위*/
  left: 0; /* 화면 왼쪽 끝에서 시작 */
  padding: 0 20px; /* 양쪽에 20px 패딩 추가 */
  box-sizing: border-box; /* 패딩 포함하여 너비 계산 */
  z-index: 8;
  height: 10rem;
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
  margin-left: 3.06rem;
  padding: 0 3.5rem;
  font-weight: 700;
  cursor: pointer;
`;
const SaveButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 22.5rem;
  height: 7.5rem;
  border-radius: 3.75rem;
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.25);
  background-color: #596fb7;
  font-size: 2.5rem;
  text-align: center;
  margin-left: 3.06rem;
  padding: 0 3.5rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
`;
const ARbutton = styled.div`
  margin-left: 3.06rem;
  font-weight: 700;
  cursor: pointer;
`;
const Exampleimage = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  position: fixed;
  width: 60%;
  height: 60%;
  top: 20%;
  background-color: #ffffff;
  z-index: 0;
`;
const ToolContainer = styled.div`
  position: fixed;
  top: 20rem;
  right: 2rem;
  /* height: 80%; */
  /* width: 50rem;
  height: 12rem; */
  width: 12rem;
  height: 49rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #000000ba;
  border-radius: 3.5rem;
  padding: 4rem 0;
`;
const SvgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 4.6875rem;
`;

const remToPixels = (rem) => {
  // 기본 폰트 크기를 가정하여 rem을 px로 변환
  return rem * 16;
};
const DescriptionBox = styled.div`
  background-color: #917159;
  width: 100%;
  height: 10rem;
  position: absolute;
  box-sizing: border-box;
  /* border-radius: ${remToPixels(1.25)}px; */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  color: white;
`;
const StyledInput = styled.input`
  width: 8rem;
  height: 8rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;

  &::-webkit-color-swatch {
    border-radius: 2rem;
    border: 0.3rem solid white;
  }
`;
const StyledSlide = styled.input`
  background: #8d8080;
  border-radius: 2rem;
  outline: none;
  -webkit-appearance: none;
  accent-color: #ffca1d;
  /* border: 2rem solid #ff96ab; */
  cursor: pointer;
  height: 1.6rem;
  margin-top: 3.3rem;
`;
const DivBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;
const Coloring = () => {
  const [artworkOne, setArtworkOne] = useRecoilState(artworkState);
  const [artworkAR, setArtworkAR] = useRecoilState(artworkARState);
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    // 이미지를 요청하는 함수
    const fetchImage = async () => {
      try {
        const response = await fetch(artworkOne.imageUrl); // Spring Boot 서버의 이미지 엔드포인트 URL
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        } else {
          console.error('이미지를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('이미지 요청 중 오류 발생:', error);
      }
    };

    fetchImage();
  }, []);

  function remToPercent(rem) {
    // 1rem이 몇 픽셀인지 계산하여 반환합니다. 대부분의 브라우저에서 1rem은 보통 16px입니다.
    var fontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    // 브라우저에서 1%는 보통 뷰포트의 너비를 기준으로 합니다.
    var viewportWidth = window.innerWidth;
    return ((rem * fontSize) / viewportWidth) * 100;
  }

  // console.log(artworkOne);
  const stageRef = useRef(null);
  const rectLayerRef = useRef(null);
  const navigate = useNavigate();
  const [tool, setTool] = useState('pen'); // 도구 ('pen' 또는 'eraser')
  const [color, setColor] = useState('#d53e66'); // 색상
  const [size, setSize] = useState(5); // 선의 굵기 상태, 기본값은 5
  const [lines, setLines] = useState([]); // 선들의 배열
  const isDrawing = useRef(false); // 그리기 상태
  const [coloringImage] = useImage(imageSrc); // 이미지 경로 수정 필요
  // const [coloringImage] = useImage(artworkOne.imageUrl); // 이미지 경로 수정 필요
  // const [coloringImage] = useImage(Gimage); // 이미지 경로 수정 필요
  // Rect 크기를 rem 단위에서 px 단위로 설정

  // const rectWidth = remToPixels(90); // 90rem을 px로 변환
  // const rectHeight = remToPixels(56.25); // 56.25rem을 px로 변환

  const rectWidth = remToPercent(3800);
  const rectHeight = remToPercent(1800);

  // const rectWidth = 2000; // 90rem을 px로 변환
  // const rectHeight = 900; // 56.25rem을 px로 변환

  //artwork 이미지 크기 조정
  // const artworkWidth = coloringImage ? (coloringImage.width < rectWidth ? coloringImage.width :  coloringImage.width * ((rectWidth-100)/coloringImage.width)) : 0;
  // const artworkHeight = coloringImage ? (coloringImage.height < rectHeight ? coloringImage.height :  coloringImage.height * ((rectHeight-100)/coloringImage.height)) : 0;

  const calcArtworkSize = () => {
    let newWidth,
      newHeight = 0;
    if (!coloringImage) return { width: 0, height: 0 };
    if (
      coloringImage.width > rectWidth - 100 ||
      coloringImage.height > rectHeight - 100
    ) {
      let widthSize = (rectWidth - 100) / coloringImage.width;
      let heightSize = (rectHeight - 100) / coloringImage.height;

      let rate = widthSize > heightSize ? heightSize : widthSize;
      newWidth = coloringImage.width * rate;
      newHeight = coloringImage.height * rate;
    } else {
      newWidth = coloringImage.width;
      newHeight = coloringImage.height;
    }
    return { width: newWidth, height: newHeight };
  };
  const { width: artworkWidth, height: artworkHeight } = calcArtworkSize();

  const imageX = window.innerWidth / 2 - artworkWidth / 2;
  const imageY = window.innerHeight / 2 - artworkHeight / 2;

  const rectX = window.innerWidth / 2 - rectWidth / 2;
  const rectY = window.innerHeight / 2 - rectHeight / 2;
  const handleMouseDown = (e) => {
    // Stage의 상대적 위치를 얻기
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    // Stage 내의 상대적 위치를 계산
    let posX = pointerPosition.x - stage.x();
    let posY = pointerPosition.y - stage.y();

    isDrawing.current = true;
    setLines([...lines, { tool, color, size, points: [posX, posY] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    // Stage 내의 상대적 위치를 계산
    let posX = pointerPosition.x - stage.x();
    let posY = pointerPosition.y - stage.y();

    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([posX, posY]);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const saveImage = async () => {
    try {
      // Rect가 포함된 Layer의 visible 속성을 false로 설정
      rectLayerRef.current.visible(false);
      stageRef.current.draw(); // 변경사항 적용을 위해 Stage를 다시 그림

      // 이미지 데이터를 불러옴
      // const response = await fetch(artworkOne.imageUrl);
      const response = await fetch(imageSrc);
      const blob = await response.blob();

      // Blob을 파일로 변환
      const blobUrl = URL.createObjectURL(blob);
      // setArtworkAR(blobUrl);
      // console.log("blbo");
      // console.log(blobUrl);
      // console.log(artworkAR);

      // Canvas에 그려진 이미지 데이터를 가져옴
      const canvas = stageRef.current.toCanvas();
      const canvasDataUrl = canvas.toDataURL();

      // 파일 다운로드 링크 생성
      const link = document.createElement('a');
      link.href = canvasDataUrl;
      link.download = 'image.jpg'; // 다운로드될 파일의 이름
      document.body.appendChild(link);

      // 파일 다운로드
      link.click();

      // artworkAR에 저장
      setArtworkAR(canvasDataUrl);

      // 다운로드 후 링크 제거
      document.body.removeChild(link);

      // Rect가 포함된 Layer의 visible 속성을 다시 true로 설정하고 Stage를 다시 그림
      rectLayerRef.current.visible(true);
      stageRef.current.draw(); // 변경사항 적용을 위해 Stage를 다시 그림
    } catch (error) {
      console.error('이미지를 다운로드하는 동안 오류가 발생했습니다:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/art');
  };

  const handleArClick = () => {
    navigate('/artCamera');
    console.log('arar');
  };

  return (
    <Background backgroundImage={backgroundImage}>
      <DivBox>
        <DescriptionBox>{artworkOne.heritageName}</DescriptionBox>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          ref={stageRef}
        >
          <Layer ref={rectLayerRef}>
            <Rect
              x={rectX}
              y={rectY + 80}
              width={rectWidth}
              height={rectHeight}
              fill='white' // 하얀색 배경
              cornerRadius={40}
            />
          </Layer>
          {/* 배경 이미지용 Layer */}
          <Layer>
            <Exampleimage>
              {coloringImage && (
                <Image
                  image={coloringImage}
                  width={artworkWidth} // 원본 너비에 배율을 적용
                  height={artworkHeight} // 원본 높이에 배율을 적용
                  // x={window.innerWidth / 2 - (coloringImage?.width ?? 0) / 2}
                  // y={window.innerHeight / 2 - (coloringImage?.height ?? 0) / 2}
                  x={imageX}
                  y={imageY + 80}
                />
              )}
            </Exampleimage>
          </Layer>

          {/* 그리기 동작용 Layer */}
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.size}
                tension={0.5}
                lineCap='round'
                lineJoin='round'
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
        <ToolContainer>
          <StyledTypeDiv
            onClick={() => {
              setTool('pen');
            }}
          >
            <StyledSVG>
              <svg
                width='110'
                height='110'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M4.67958 16.3295L4.67932 16.3293C3.87972 15.7343 3.41992 14.7397 3.41992 13.5098C3.41992 12.3561 4.04779 10.9234 4.73072 9.70239C5.06929 9.09707 5.41603 8.55286 5.69428 8.13308C5.82249 7.93966 5.93919 7.76832 6.03359 7.62972C6.13875 7.47533 6.21623 7.36158 6.2511 7.30321C6.39852 7.06242 6.61093 6.71365 6.71925 6.39547C6.77302 6.23753 6.81025 6.06223 6.7835 5.90016C6.75401 5.72146 6.64796 5.57214 6.45574 5.49469C6.30069 5.43041 6.13383 5.47375 5.99992 5.53261C5.85811 5.59494 5.70482 5.69615 5.54898 5.81644C5.27775 6.02576 4.97249 6.31364 4.6678 6.61806L3.19301 5.17698C3.39086 4.95189 3.64192 4.70061 3.94134 4.40119C4.05638 4.28615 4.3929 3.98502 4.8592 3.71392C5.3266 3.44217 5.90865 3.20977 6.51992 3.20977C6.91037 3.20977 7.49095 3.36721 7.97116 3.778C8.44402 4.18248 8.82992 4.84125 8.82992 5.86977C8.82992 7.1623 8.34494 7.89672 7.56486 9.03683L7.56468 9.0371C7.11223 9.70069 6.0491 11.4894 5.68975 12.6078C5.50148 13.1783 5.47249 13.6959 5.56122 14.0832C5.64569 14.4519 5.86773 14.7898 6.23992 14.7898C6.53314 14.7898 6.79637 14.61 6.99589 14.4312C7.1841 14.2626 7.35092 14.0616 7.4712 13.9167C7.48088 13.9051 7.49025 13.8938 7.49932 13.8829C7.75118 13.6173 9.21854 11.8815 9.79567 11.1552C10.1675 10.7004 10.8262 10.0054 11.6649 9.42552C12.5056 8.84429 13.5109 8.38977 14.5799 8.38977C15.9817 8.38977 16.8937 8.99317 17.4801 9.7896C18.073 10.5948 18.3378 11.606 18.4107 12.4079L18.4273 12.5898H18.6099H20.8799V14.6898H18.6199H18.436L18.4206 14.8731C18.2236 17.2224 17.4727 18.6996 16.594 19.5879C15.7139 20.4775 14.6931 20.7898 13.9299 20.7898C12.2633 20.7898 10.9199 19.4824 10.9199 17.8998C10.9199 16.2945 12.4523 13.3502 16.1333 12.727L16.3251 12.6945L16.298 12.5018C16.2914 12.4551 16.285 12.406 16.2785 12.3552C16.2337 12.0089 16.1784 11.5805 15.9587 11.235C15.6885 10.81 15.2 10.5398 14.3399 10.5398C13.9771 10.5398 13.6053 10.6804 13.243 10.8958C12.879 11.1123 12.5095 11.4134 12.1475 11.7557C11.424 12.4398 10.7086 13.31 10.1047 14.0537L10.1045 14.0539L10.0974 14.0627C9.54309 14.7468 9.05547 15.3486 8.57496 15.8194C8.09281 16.2918 7.63352 16.6159 7.14427 16.7577L7.14426 16.7577L7.14245 16.7582C6.30223 17.0103 5.37808 16.8511 4.67958 16.3295ZM16.2887 15.1019L16.321 14.8126L16.0393 14.8863C14.9275 15.1772 14.1741 15.741 13.6982 16.3174C13.2286 16.8862 13.0199 17.4797 13.0199 17.8398C13.0199 18.1382 13.1612 18.3714 13.3452 18.5256C13.525 18.6762 13.7548 18.7598 13.9599 18.7598C14.8219 18.7598 15.9856 17.8194 16.2887 15.1019Z'
                  fill={color}
                  stroke='black'
                  stroke-width='0.08'
                />
              </svg>
            </StyledSVG>
          </StyledTypeDiv>
          <StyledTypeDiv
            onClick={() => {
              setTool('eraser');
            }}
          >
            <StyledSVG>
              <svg
                width='100'
                height='100'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M15.6384 16.33C15.6429 16.3255 15.6468 16.3207 15.651 16.3161L20.7166 11.2494C21.1416 10.8245 21.3754 10.2585 21.375 9.65566C21.3746 9.05375 21.1407 8.48906 20.7167 8.06605L16.8946 4.24285C16.4707 3.81922 15.9054 3.58594 15.3029 3.58594C14.7003 3.58594 14.1351 3.8193 13.7114 4.24297L3.2834 14.6692C2.85836 15.0942 2.62453 15.6607 2.625 16.2645C2.62551 16.867 2.85945 17.4318 3.28336 17.8543L5.72836 20.2998C5.73074 20.3022 5.73332 20.3042 5.7357 20.3065C5.7425 20.313 5.74934 20.3195 5.75656 20.3254C5.75977 20.328 5.76324 20.3303 5.76652 20.3328C5.77336 20.3381 5.78016 20.3434 5.78731 20.3482C5.79004 20.3501 5.79297 20.3516 5.7957 20.3533C5.80371 20.3584 5.8118 20.3635 5.8202 20.368C5.82219 20.369 5.82422 20.3699 5.82621 20.3709C5.83555 20.3757 5.84504 20.3803 5.85481 20.3844C5.85609 20.385 5.85742 20.3854 5.85875 20.3859C5.86926 20.3901 5.87984 20.394 5.89074 20.3973C5.89207 20.3977 5.89348 20.398 5.89481 20.3984C5.90559 20.4015 5.91652 20.4044 5.92766 20.4066C5.93086 20.4073 5.9341 20.4075 5.93731 20.4081C5.94664 20.4097 5.95602 20.4114 5.96559 20.4123C5.97848 20.4136 5.99148 20.4143 6.00457 20.4143H11.3917H17.6146C17.8304 20.4143 18.0053 20.2393 18.0053 20.0236C18.0053 19.8079 17.8304 19.633 17.6146 19.633H12.3346L15.6245 16.3425C15.6291 16.3384 15.6339 16.3345 15.6384 16.33ZM11.2299 19.633H6.16641L3.83535 17.3014C3.55895 17.0259 3.40656 16.6574 3.40625 16.2638C3.40594 15.8691 3.55848 15.4989 3.83578 15.2216L8.90707 10.1512L14.8091 16.0532L11.2299 19.633ZM9.45957 9.59879L14.2638 4.79539C14.5399 4.51926 14.9089 4.36715 15.3029 4.36715C15.6968 4.36715 16.066 4.5193 16.3423 4.79535L20.1645 8.61879C20.4411 8.89469 20.5935 9.26305 20.5938 9.65617C20.594 10.0501 20.4415 10.4197 20.1642 10.697L15.3614 15.5007L9.45957 9.59879Z'
                  fill='black'
                  stroke='black'
                  stroke-width='1.2'
                />
              </svg>
            </StyledSVG>
          </StyledTypeDiv>

          <StyledInput
            type='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <StyledSlide
            type='range'
            min='1'
            max='50'
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <StyledP>{size}</StyledP>
        </ToolContainer>
      </DivBox>
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
          뒤로가기
        </BackButton>
        <SaveButton onClick={saveImage}>
          <SvgBox>
            <svg
              width='70'
              height='70'
              viewBox='0 0 70 70'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M55.4167 35V55.4167H14.5833V35H8.75V55.4167C8.75 58.625 11.375 61.25 14.5833 61.25H55.4167C58.625 61.25 61.25 58.625 61.25 55.4167V35H55.4167ZM37.9167 36.9542L45.4708 29.4292L49.5833 33.5417L35 48.125L20.4167 33.5417L24.5292 29.4292L32.0833 36.9542V8.75H37.9167V36.9542Z'
                fill='white'
              />
            </svg>
          </SvgBox>
          저장하기
        </SaveButton>
        <ARbutton onClick={handleArClick}>
          <SvgBox>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='120'
              height='120'
              viewBox='0 0 120 120'
              fill='none'
            >
              <circle cx='60' cy='60' r='60' fill='#F1ECE1' />
              <text
                x='50%'
                y='50%'
                textAnchor='middle'
                dy='.3em'
                fill='black'
                fontSize='40'
              >
                AR
              </text>
            </svg>
          </SvgBox>
        </ARbutton>
      </ButtonBox>
    </Background>
  );
};

const StyledTypeDiv = styled.div`
  /* font-size: 2rem; */
  /* text-align: center; */
  width: 8rem;
  height: 8rem;
  /* margin-bottom: 1rem; */
  background-color: white;
  border: 0.3rem solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const StyledSVG = styled.div``;
const StyledP = styled.p`
  font-size: 2rem;
  padding: 0;
  margin: 0;
  color: white;
`;

export default Coloring;
