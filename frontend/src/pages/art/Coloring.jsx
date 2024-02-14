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
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const SvgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 4.6875rem;
`;
const DrawingTool = styled.div``;
const StyledSelect = styled.select`
  height: 40px; // 높이 증가
  font-size: 16px; // 폰트 크기 증가
  margin-bottom: 10px; // 아래 요소와의 간격
  padding: 5px 10px; // 내부 여백 증가
`;
const remToPixels = (rem) => {
  // 기본 폰트 크기를 가정하여 rem을 px로 변환
  return rem * 16;
};
const DescriptionBox = styled.div`
  background-color: #917159;
  width: ${remToPixels(90)}px;
  height: ${remToPixels(15.4375)}px;
  position: absolute; /* Change 'fixed' to 'absolute' */
  top: ${remToPixels(6.81)}px;
  margin-bottom: ${remToPixels(4.44)}px;
  transform: translate(-50%, 0); /* Remove vertical translation */
  left: 50%; /* Center horizontally */
  box-sizing: border-box;
  border-radius: ${remToPixels(1.25)}px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
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

  // console.log(artworkOne);
  const stageRef = useRef(null);
  const rectLayerRef = useRef(null);
  const navigate = useNavigate();
  const [tool, setTool] = useState('pen'); // 도구 ('pen' 또는 'eraser')
  const [color, setColor] = useState('#000000'); // 색상
  const [size, setSize] = useState(5); // 선의 굵기 상태, 기본값은 5
  const [lines, setLines] = useState([]); // 선들의 배열
  const isDrawing = useRef(false); // 그리기 상태
  const [coloringImage] = useImage(imageSrc); // 이미지 경로 수정 필요
  // const [coloringImage] = useImage(artworkOne.imageUrl); // 이미지 경로 수정 필요
  // const [coloringImage] = useImage(Gimage); // 이미지 경로 수정 필요
  // Rect 크기를 rem 단위에서 px 단위로 설정
  const rectWidth = remToPixels(90); // 90rem을 px로 변환
  const rectHeight = remToPixels(56.25); // 56.25rem을 px로 변환
  
  //artwork 이미지 크기 조정
  // const artworkWidth = coloringImage ? (coloringImage.width < rectWidth ? coloringImage.width :  coloringImage.width * ((rectWidth-100)/coloringImage.width)) : 0; 
  // const artworkHeight = coloringImage ? (coloringImage.height < rectHeight ? coloringImage.height :  coloringImage.height * ((rectHeight-100)/coloringImage.height)) : 0;

  const calcArtworkSize = () =>{
    let newWidth, newHeight = 0;
    if(!coloringImage) return  { width: 0, height: 0 };
    if(coloringImage.width > rectWidth-100 || coloringImage.height > rectHeight-100 ){
      let widthSize = (rectWidth-100)/coloringImage.width;
      let heightSize = (rectHeight-100)/coloringImage.height;

      let rate = widthSize > heightSize ? heightSize : widthSize;
      newWidth = coloringImage.width * rate;
      newHeight = coloringImage.height * rate;
    }else{
      newWidth = coloringImage.width;
      newHeight = coloringImage.height;
    }
    return { width: newWidth, height: newHeight };
  }
  const {width : artworkWidth, height: artworkHeight} = calcArtworkSize(); 

 
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

  // const saveImage = () => {
  //   const tempCanvas = document.createElement('canvas');
  //   tempCanvas.width = stageRef.current.width();
  //   tempCanvas.height = stageRef.current.height();
  //   const ctx = tempCanvas.getContext('2d');

  //   // Konva 캔버스의 이미지를 임시 캔버스에 그림
  //   const image = new window.Image(); // 'window.'를 사용하여 Image 생성자를 명시적으로 참조
  //   image.onload = () => {
  //     ctx.drawImage(image, 0, 0);
  //     // 임시 캔버스의 데이터 URL을 사용하여 이미지 저장 로직 진행
  //     const dataURL = tempCanvas.toDataURL();
  //     const link = document.createElement('a');
  //     link.download = 'coloring-book.png';
  //     link.href = dataURL;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   };
  //   image.src = stageRef.current.toDataURL();
  // };
  // const saveImage = () => {
  //   // Rect가 포함된 Layer의 visible 속성을 false로 설정
  //   rectLayerRef.current.visible(false);
  //   stageRef.current.draw(); // 변경사항 적용을 위해 Stage를 다시 그림

  //   // 이미지 저장 로직
  //   const dataURL = stageRef.current.toDataURL();
  //   const link = document.createElement('a');
  //   link.download = 'coloring-book.png';
  //   link.href = dataURL;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);

  //   // Rect가 포함된 Layer의 visible 속성을 다시 true로 설정하고 Stage를 다시 그림
  //   rectLayerRef.current.visible(true);
  //   stageRef.current.draw(); // 변경사항 적용을 위해 Stage를 다시 그림
  // };


 

// 이미지를 다운로드할 함수
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
    console.log("arar");
  };
  
  return (
    <Background backgroundImage={backgroundImage}>
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
            y={rectY + 100}
            width={rectWidth}
            height={rectHeight}
            fill='white' // 하얀색 배경
            cornerRadius={50}
          />
        </Layer>
        {/* 배경 이미지용 Layer */}
        <Layer>
          <Exampleimage>
            {coloringImage && (
              <Image
                image={coloringImage}
                width={artworkWidth } // 원본 너비에 배율을 적용
                height={artworkHeight } // 원본 높이에 배율을 적용
                // x={window.innerWidth / 2 - (coloringImage?.width ?? 0) / 2}
                // y={window.innerHeight / 2 - (coloringImage?.height ?? 0) / 2}
                x={imageX}
                y={imageY + 100}
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
        <select value={tool} onChange={(e) => setTool(e.target.value)}>
          <option value='pen'>Pen</option>
          <option value='eraser'>Eraser</option>
        </select>
        <input
          type='color'
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
        <input
          type='range'
          min='1'
          max='50'
          value={size}
          onChange={(e) => setSize(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
      </ToolContainer>
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

export default Coloring;
