import axios from 'axios'
import './Presentation.css'
import { useState } from 'react'

function ActiveModal({ onClose }) {
  const [presentationTitle, setPresentationTitle] = useState('')
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/presentation', {
        presentationTitle,
        group: {
          groupId: 1,
        },
      })
      alert(`그룹생성완료: ${response.data.id}`)
      onClose()
    } catch (error) {
      console.error('Error creating presentation:', error)
      alert('그룹생성실패')
    }
  }

  return (
    <div className='ActiveModal'>
      <div className='modalContent'>
        <input
          type='text'
          placeholder='활동명 입력'
          value={presentationTitle}
          onChange={(e) => setPresentationTitle(e.target.value)}
        />
        <div>
          <button onClick={onClose}>취소</button>
          <button onClick={handleSubmit}>생성</button>
        </div>
      </div>
    </div>
  )
}

export default ActiveModal
