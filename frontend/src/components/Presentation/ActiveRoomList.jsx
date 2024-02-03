import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import { presentationListState, roomListState } from 'store/PresentationStates'
import { useNavigate, useParams } from 'react-router-dom'
import 'components/Presentation/Presentation.css'
import RoomModal from './RoomModal'

function ActiveRoomList() {
  const [roomList, setRoomList] = useRecoilState(roomListState)
  const navigate = useNavigate()
  const presentationList = useRecoilValue(presentationListState)
  let { categoryId } = useParams()

  const categoryIdInt = parseInt(categoryId, 10)
  const matchedPresentation = presentationList.find(
    (presentation) => presentation.presentationId === categoryIdInt
  )

  useEffect(() => {
    axios
      .get('http://localhost:8080/room/1')
      .then((response) => {
        setRoomList(response.data)
      })
      .catch((error) => {
        console.error('Error fetching room list:', error)
      })
  }, [setRoomList])

  const handleRoomClick = (roomId) => {
    navigate(`/presentation/${categoryIdInt}/:roomId`)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className='ActiveRoomContainer'>
      <button
        className='PresentationButton'
        onClick={() => setIsModalOpen(true)}
      >
        생성
      </button>
      <div className='PresentationTitle'>
        <h1>
          {matchedPresentation
            ? matchedPresentation.presentationTitle
            : 'No matching presentation'}
        </h1>
      </div>
      {roomList.map((room) => (
        <div
          key={room.roomId}
          className='ActiveRoomBox'
          onClick={() => handleRoomClick(room.roomId)}
        >
          {room.roomSubject}
        </div>
      ))}
      {isModalOpen && <RoomModal onClose={() => setIsModalOpen(false)} />}
      <div className='ActiveRoomFooter'>
        <button>종료</button>
        <button>시작</button>
      </div>
    </div>
  )
}

export default ActiveRoomList
