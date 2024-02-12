import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useNavigate } from 'react-router';
import { Stage, Layer, Line, Text, Image, Rect } from 'react-konva';
import styled from 'styled-components';
import backgroundImage from 'assets/images/Art/artbackgroundimage.png';
import Background from 'components/Basic/Background';
import Konva from 'konva';
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

const Drawing = () => {
  const stageRef = useRef(null);
  const rectLayerRef = useRef(null);
  
  const navigate = useNavigate();
  // const navigate = useNavigate(); // useNavigate 훅 사용
  const [tool, setTool] = useState('pen'); // 도구 ('pen' 또는 'eraser')
  const [color, setColor] = useState('#000000'); // 색상
  const [size, setSize] = useState(5); // 선의 굵기 상태, 기본값은 5
  const [lines, setLines] = useState([]); // 선들의 배열
  const isDrawing = useRef(false); // 그리기 상태
  //   const [coloringImage] = useImage(Gimage); // 이미지 경로 수정 필요
  //   const imageWidth = coloringImage ? coloringImage.width * 1.2 : 0;
  //   const imageHeight = coloringImage ? coloringImage.height * 1.2 : 0;
  //   const imageX = window.innerWidth / 2 - imageWidth / 2;
  //   const imageY = window.innerHeight / 2 - imageHeight / 2;
  // Rect 크기를 rem 단위에서 px 단위로 설정
  const rectWidth = remToPixels(90); // 90rem을 px로 변환
  const rectHeight = remToPixels(56.25); // 56.25rem을 px로 변환

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

    // Rect 경계 내에서만 그림을 그릴 수 있도록 수정
    let posX = pointerPosition.x - stage.x();
    let posY = pointerPosition.y - stage.y();

    // Rect 경계를 벗어나면 그리기를 중단
    if (
      posX < rectX ||
      posX > rectX + rectWidth ||
      posY < rectY ||
      posY > rectY + rectHeight
    ) {
      // 선을 끝내는 로직을 추가할 수 있습니다.
      return;
    }

    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([posX, posY]);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const saveImage = () => {
    // 새로운 Layer 생성
    const saveLayer = new Konva.Layer();

    // lines 배열을 순회하며 각 선이 Rect 내부에 있는지 확인 후 saveLayer에 추가
    lines.forEach((line) => {
      // 여기서는 간단히 모든 선을 saveLayer에 추가합니다.
      // 실제로는 선이 Rect 내부에 있는지 확인하는 로직이 필요합니다.
      const newLine = new Konva.Line({
        points: line.points,
        stroke: line.color,
        strokeWidth: line.size,
        globalCompositeOperation:
          line.tool === 'eraser' ? 'destination-out' : 'source-over',
      });
      saveLayer.add(newLine);
    });

    // 임시로 stage에 saveLayer를 추가
    stageRef.current.add(saveLayer);

    // saveLayer를 사용해 이미지 데이터 생성
    const dataURL = saveLayer.toDataURL({
      pixelRatio: 3, // 이미지 품질을 높이기 위해 pixelRatio 조정
    });

    // 생성된 이미지 데이터를 사용하여 파일 다운로드
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // saveLayer 제거
    saveLayer.destroy();
  };

  const handleBackClick = () => {
    // navigate('/main');
  };

  const handleArClick = () => {
    navigate('/artCamera');
    console.log("arar");
  };
  return (
    <Background backgroundImage={backgroundImage}>
      <DescriptionBox>고려청자 그림을 그려주세요</DescriptionBox>
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
        {/* <Layer>
          <Exampleimage>
            {coloringImage && (
              <Image
                image={coloringImage}
                width={coloringImage.width * 1.2} // 원본 너비에 배율을 적용
                height={coloringImage.height * 1.2} // 원본 높이에 배율을 적용
                // x={window.innerWidth / 2 - (coloringImage?.width ?? 0) / 2}
                // y={window.innerHeight / 2 - (coloringImage?.height ?? 0) / 2}
                x={imageX}
                y={imageY + 100}
              />
            )}
          </Exampleimage>
        </Layer> */}

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

export default Drawing;
