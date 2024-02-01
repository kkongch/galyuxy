import React from 'react'
import "components/Class/Class.css"
import PhotoFlame from 'components/Class/PhotoFlame'
import StudentPhotoFlame from 'components/Class/StudentPhotoFlame'

function Class() {
  return (
    <div className='classContainer'>

      {/* <PhotoFlame>
         선생님전용페이지
      </PhotoFlame> */}
      <StudentPhotoFlame>학생전용페이지</StudentPhotoFlame>
    </div>
  )
}

export default Class
