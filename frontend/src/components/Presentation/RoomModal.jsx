import React, { useState } from 'react'
import axios from 'axios'
import './Presentation.css' // 경로에 맞게 조정해야 합니다.

function RoomModal({ onClose, presentationId }) {
  const [roomSubject, setRoomSubject] = useState('') // 방 주제 상태
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/room', {
        // roomId는 서버에서 생성될 것으로 가정하고 여기서는 보내지 않습니다.
        roomSubject: roomSubject,
        presentation: {
          presentationId: presentationId, // 부모 컴포넌트로부터 받은 presentationId 사용
        },
      })
      alert(`방 생성 완료: ${response.data.roomId}`) // 응답에 따라 roomId 표시
      onClose() // 모달 닫기
    } catch (error) {
      console.error('Error creating room:', error)
      alert('방 생성 실패')
    }
  }

  return (
    <div className='ActiveModal'>
      <div className='modalContent'>
        <input
          type='text'
          placeholder='방 주제 입력'
          value={roomSubject}
          onChange={(e) => setRoomSubject(e.target.value)}
        />
        <div>
          <button onClick={onClose}>취소</button>
          <button onClick={handleSubmit}>생성</button>
        </div>
      </div>
    </div>
  )
}

export default RoomModal
