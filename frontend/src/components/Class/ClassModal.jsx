import React, { useState } from 'react';
import "components/Class/Class.css"


const ClassModal = ({ onClose, onSubmit }) => {
  const [className, setClassName] = useState('');
  const [studentNo, setStudentNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);

  const handleClassNameChange = (e) => setClassName(e.target.value);
  const handleStudentNoChange = (e) => setStudentNo(e.target.value);
  const handleStudentNameChange = (e) => setStudentName(e.target.value);

  const handleAddStudent = () => {
    if (!studentNo || !studentName) return;
    setStudents([...students, { studentNo, studentName }]);
    setStudentNo('');
    setStudentName('');
  };

  const handleRemoveStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    const newClass = {
      teacherId: 1, // 이 값은 상황에 따라 변경되어야 할 수 있습니다.
      groupName: className,
      students: students.map(s => ({ studentName: s.studentName, studentNo: s.studentNo }))
    };
    onSubmit(newClass);
    onClose();
  };


  //더미데이터 연습
  const dummyData = [
    {
      "studentId": 1,
      "studentName": "김가영",
      "studentNo": "1",
      "studentIsDeleted": 0, // 0: 삭제 되지 않음, 1: 삭제 됨
    },
    {
      "studentId": 2,
      "studentName": "김나영",
      "studentNo": "2",
      "studentIsDeleted": 0,
    },
    // 추가적인 더미 데이터 학생들...
  ];

  return (
    <div className="modal">
      <input type="text" value={className} onChange={handleClassNameChange} placeholder="클래스 이름" />
      <input type="text" value={studentNo} onChange={handleStudentNoChange} placeholder="학생 반 번호" />
      <input type="text" value={studentName} onChange={handleStudentNameChange} placeholder="학생 이름" />
      <button onClick={handleAddStudent}>학생 추가</button>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            반 번호: {student.studentNo}, 이름: {student.studentName}
            <button onClick={() => handleRemoveStudent(index)}>제거</button>
          </li>
        ))}
      </ul>



        {/* 2번째 학생들이 나열되는 박스부분 */}
      <div className="modal-body">
        <ul>
          {dummyData.map((student, index) => (
            <li key={student.studentId}>
              반 번호: {student.studentNo}, 이름: {student.studentName}
              <button className="remove-student" onClick={() => handleRemoveStudent(index)}>X</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={handleConfirm}>확인</button>
        <button onClick={onClose}>취소</button>
      </div>


    </div>



    

    


  );
};


export default ClassModal