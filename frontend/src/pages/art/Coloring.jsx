import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Stage, Layer, Line, Text, Image, Rect } from 'react-konva'
import useImage from 'use-image'
import Gimage from 'assets/images/고려청자컬러링북.png'
import Konva from 'konva'
import styled from 'styled-components'
import backgroundImage from 'assets/images/Art/artbackgroundimage.png'
import Background from 'components/Basic/Background'
import { useNavigate } from 'react-router-dom'

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

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

const Exampleimage = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  position: fixed;
  width: 60%;
  height: 60%;
  top : 20%;
  background-color: #ffffff;
  z-index: 0;
`
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
const Coloring = () => {
  const stageRef = useRef(null)
  // const navigate = useNavigate()
  const [tool, setTool] = useState('pen') // 도구 ('pen' 또는 'eraser')
  const [color, setColor] = useState('#000000') // 색상
  const [size, setSize] = useState(5) // 선의 굵기 상태, 기본값은 5
  const [lines, setLines] = useState([]) // 선들의 배열
  const isDrawing = useRef(false) // 그리기 상태
  const [coloringImage] = useImage(Gimage) // 이미지 경로 수정 필요
  const imageWidth = coloringImage ? coloringImage.width * 1.2 : 0;
  const imageHeight = coloringImage ? coloringImage.height * 1.2 : 0;
  const imageX = window.innerWidth / 2 - imageWidth / 2;
  const imageY = window.innerHeight / 2 - imageHeight / 2;
   // Rect 크기를 rem 단위에서 px 단위로 설정
   const rectWidth = remToPixels(90); // 90rem을 px로 변환
   const rectHeight = remToPixels(56.25); // 56.25rem을 px로 변환
 
  const rectX = window.innerWidth / 2 - rectWidth / 2;
  const rectY = window.innerHeight / 2 - rectHeight / 2;

  
  // const handleMouseDown = (e) => {
  //   isDrawing.current = true
  //   const pos = e.target.getStage().getPointerPosition()
  //   setLines([...lines, { tool, color, size, points: [pos.x, pos.y] }])
  // }

  // const handleMouseMove = (e) => {
  //   if (!isDrawing.current) {
  //     return
  //   }
  //   const stage = e.target.getStage()
  //   const point = stage.getPointerPosition()
  //   let lastLine = lines[lines.length - 1]
  //   lastLine.points = lastLine.points.concat([point.x, point.y])
  //   lines.splice(lines.length - 1, 1, lastLine)
  //   setLines([...lines])
  // }

  // const handleMouseUp = () => {
  //   isDrawing.current = false
  // }
  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    // 포인터 위치가 Rect 객체 내부인지 확인
    if (
      pos.x >= rectX && pos.x <= rectX + rectWidth &&
      pos.y >= rectY && pos.y <= rectY + rectHeight
    ) {
      isDrawing.current = true;
      setLines([...lines, { tool, color, size, points: [pos.x - rectX, pos.y - rectY] }]);
    }
  };
  
  const handleMouseMove = (e) => {
    // 마우스가 눌린 상태가 아니면 아무것도 하지 않음
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
  
    // 포인터 위치가 Rect 객체 내부인지 확인
    if (isDrawing.current){
      if (
        point.x >= rectX && point.x <= rectX + rectWidth &&
        point.y >= rectY && point.y <= rectY + rectHeight
      ) {
        // Rect 내부에서만 그리기 계속
        let lastLine = lines[lines.length - 1];
        // 마지막 점을 업데이트 (Rect 안에서의 상대적 위치)
        lastLine.points = lastLine.points.concat([point.x - rectX, point.y - rectY]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines([...lines]);
      } else {
        // 포인터가 Rect 바깥으로 나가면 그리기 중단
        isDrawing.current = false;
        // 마지막 점을 업데이트하여 그리기를 완료
        let lastLine = lines[lines.length - 1];
        // Rect 경계에 점을 추가하여 선을 마무리
        if (lastLine) {
          const lastPointX = Math.min(Math.max(point.x, rectX), rectX + rectWidth);
          const lastPointY = Math.min(Math.max(point.y, rectY), rectY + rectHeight);
          lastLine.points = lastLine.points.concat([lastPointX - rectX, lastPointY - rectY]);
          lines.splice(lines.length - 1, 1, lastLine);
          setLines([...lines]);
        }
      }
    }
  };
  
  const handleMouseUp = () => {
    isDrawing.current = false;
    setLines([...lines]);
  };
  
  const saveImage = () => {
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = stageRef.current.width()
    tempCanvas.height = stageRef.current.height()
    const ctx = tempCanvas.getContext('2d')

    // 하얀 배경을 임시 캔버스에 그림
    // ctx.fillStyle = 'white'
    // ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)

    // Konva 캔버스의 이미지를 임시 캔버스에 그림
    const image = new window.Image() // 'window.'를 사용하여 Image 생성자를 명시적으로 참조
    image.onload = () => {
      ctx.drawImage(image, 0, 0)
      // 임시 캔버스의 데이터 URL을 사용하여 이미지 저장 로직 진행
      const dataURL = tempCanvas.toDataURL()
      const link = document.createElement('a')
      link.download = 'coloring-book.png'
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    image.src = stageRef.current.toDataURL()
    console.log(window.innerWidth)
  }
  const handleBackClick = () => {
    // navigate('/main');
  };
  return (
    <Background backgroundImage={backgroundImage}>
      
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          <Rect
            x={rectX}
            y={rectY+100}
            width={rectWidth}
            height={rectHeight}
            fill="white" // 하얀색 배경
          />
        </Layer>
        {/* 배경 이미지용 Layer */}
        <Layer>
          <Exampleimage>
            {coloringImage && (
              <Image
                image={coloringImage}
                width={coloringImage.width * 1.2} // 원본 너비에 배율을 적용
                height={coloringImage.height * 1.2} // 원본 높이에 배율을 적용
                // x={window.innerWidth / 2 - (coloringImage?.width ?? 0) / 2}
                // y={window.innerHeight / 2 - (coloringImage?.height ?? 0) / 2}
                x={imageX}
                y={imageY+100}

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
        style={{ marginLeft: '10px'}}
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
        </BackButton> 
        <SaveButton onClick={saveImage}>
          <SvgBox>
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M55.4167 35V55.4167H14.5833V35H8.75V55.4167C8.75 58.625 11.375 61.25 14.5833 61.25H55.4167C58.625 61.25 61.25 58.625 61.25 55.4167V35H55.4167ZM37.9167 36.9542L45.4708 29.4292L49.5833 33.5417L35 48.125L20.4167 33.5417L24.5292 29.4292L32.0833 36.9542V8.75H37.9167V36.9542Z" fill="white"/>
</svg>

          </SvgBox>
        </SaveButton>
      </ButtonBox>
    </Background>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<Coloring />)

export default Coloring
