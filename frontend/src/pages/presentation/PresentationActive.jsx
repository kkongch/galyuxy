import React from 'react'
import 'components/Presentation/Presentation.css'
import ActiveRoomList from 'components/Presentation/ActiveRoomList'

function PresentationActive() {
  return (
    <div className='PresentationContainer'>
      <ActiveRoomList></ActiveRoomList>
    </div>
  )
}

export default PresentationActive
