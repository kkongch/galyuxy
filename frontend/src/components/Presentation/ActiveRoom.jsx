import React, { useEffect, useState } from 'react'

function ActiveRoom() {
  const [roomlist, setroomlist] = useState([1, 2, 3, 4])

  return (
    <div className='VideoboxContainer'>
      {roomlist.map((room) => (
        <div className='VideoBox'></div>
      ))}
    </div>
  )
}

export default ActiveRoom
