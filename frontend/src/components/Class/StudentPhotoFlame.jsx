import React from 'react';
import { useRecoilValue } from 'recoil';
import { studentListState } from 'store/ClassStates';
import { useNavigate } from 'react-router-dom'; // React Router v6 훅 사용
import 'components/Class/Class.css';




const StudentPhotoFlame = () => {
  const studentList = useRecoilValue(studentListState);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  
  // 메인 페이지로 이동하는 함수
  const navigateToMain = () => {
    navigate('/main'); // 메인 페이지 경로 설정
  };


    return (
    <div className='frame'>
      <div className='contentframe'>
        {studentList.map((student) => (
            !student.studentIsDeleted && (
                <div 
                key={student.studentId} 
                className="student-item" 
                onClick={() => navigateToMain()} // 클릭 시 메인 페이지로 이동
                >
                <span>{student.studentNo}</span>
                <span>{student.studentName}</span>
                </div>
            )
            ))}
      </div>
    </div>
  )
}





export default StudentPhotoFlame;
