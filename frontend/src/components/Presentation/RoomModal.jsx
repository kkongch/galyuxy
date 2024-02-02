import React, { useState } from 'react'
import axios from 'axios'
import './Presentation.css'

function RoomModal({ onClose, presentationId }) {
  const [roomSubject, setRoomSubject] = useState('')
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/room', {
        roomSubject: roomSubject,
        presentation: {
          presentationId: presentationId,
        },
      })
      alert(`방 생성 완료: ${response.data.roomId}`)
      onClose()
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
