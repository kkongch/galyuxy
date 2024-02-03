import React, { useState } from 'react'
import 'components/Presentation/Presentation.css'
import { presentationListState } from 'store/PresentationStates'
import { useRecoilValue } from 'recoil'
import ActiveModal from './ActiveModal'
import { useNavigate } from 'react-router-dom'

function ActiveList() {
  const presentationList = useRecoilValue(presentationListState)
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigateToCategory = (categoryId) => {
    navigate(`/presentation/${categoryId}`)
  }

  return (
    <div className='ActiveContainer'>
      <div className='ActiveHeader'> 활동목록</div>
      <button onClick={() => setIsModalOpen(true)}>생성</button>

      {presentationList.map((presentation, index) => (
        <div
          key={presentation.presentationId}
          className='ActiveBox'
          onClick={() => navigateToCategory(presentation.presentationId)}
        >
          <span>{index + 1}</span>
          <span>{presentation.presentationTitle}</span>
        </div>
      ))}
      {isModalOpen && <ActiveModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default ActiveList
