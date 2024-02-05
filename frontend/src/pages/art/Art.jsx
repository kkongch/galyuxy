import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Stage, Layer, Line, Text, Image } from 'react-konva'
import useImage from 'use-image'
import Gimage from 'assets/images/고려청자컬러링북.png'
import Konva from 'konva'

const Art = () => {
  const stageRef = useRef(null)
  const [tool, setTool] = useState('pen') // 도구 ('pen' 또는 'eraser')
  const [color, setColor] = useState('#000000') // 색상
  const [size, setSize] = useState(5) // 선의 굵기 상태, 기본값은 5
  const [lines, setLines] = useState([]) // 선들의 배열
  const isDrawing = useRef(false) // 그리기 상태
  const [coloringImage] = useImage(Gimage) // 이미지 경로 수정 필요

  const handleMouseDown = (e) => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, { tool, color, size, points: [pos.x, pos.y] }])
  }

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    let lastLine = lines[lines.length - 1]
    lastLine.points = lastLine.points.concat([point.x, point.y])
    lines.splice(lines.length - 1, 1, lastLine)
    setLines([...lines])
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

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
  }
  return (
    <div>
      <button onClick={saveImage} style={{ position: 'fixed', zIndex: 10 }}>
        Save Image
      </button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
      >
        {/* 배경 이미지용 Layer */}
        <Layer>
          {coloringImage && (
            <Image
              image={coloringImage}
              x={window.innerWidth / 2 - (coloringImage?.width ?? 0) / 2}
              y={window.innerHeight / 2 - (coloringImage?.height ?? 0) / 2}
            />
          )}
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
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<Art />)

export default Art
