import React, { useEffect, useState } from 'react'
import 'components/Class/Class.css'

const ClassModal = ({ onClose, onSubmit, isEditing, initialData }) => {
  const [className, setClassName] = useState('')
  const [studentNo, setStudentNo] = useState('')
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])

  const handleClassNameChange = (e) => setClassName(e.target.value)
  const handleStudentNoChange = (e) => setStudentNo(e.target.value)
  const handleStudentNameChange = (e) => setStudentName(e.target.value)
  useEffect(() => {
    if (isEditing && initialData) {
      setClassName(initialData.className)
      setStudents(initialData.students)
    }
  }, [isEditing, initialData])

  const handleAddStudent = () => {
    if (!studentNo || !studentName) return
    setStudents([...students, { studentNo, studentName }])
    setStudentNo('')
    setStudentName('')
  }

  const handleRemoveStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index))
  }
  const handleConfirm = () => {
    const classData = {
      groupName: className,
      students: students.map((s) => ({
        studentName: s.studentName,
        studentNo: s.studentNo,
      })),
    }
    onSubmit(classData, isEditing) // 여기에서 호출됨
    onClose()
  }

  return (
    <div className='modal'>
      <div className='modal-header'>
        <input
          type='text'
          value={className}
          onChange={handleClassNameChange}
          placeholder='클래스 이름'
        />
      </div>
      <div className='student-inputs'>
        <input
          type='text'
          value={studentNo}
          onChange={handleStudentNoChange}
          placeholder='학생 반 번호'
        />
        <input
          type='text'
          value={studentName}
          onChange={handleStudentNameChange}
          placeholder='학생 이름'
        />
        <button onClick={handleAddStudent}>학생 추가</button>
      </div>
      <div className='modal-body'>
        {students.map((student, index) => (
          <div key={index} className='student-item'>
            반 번호: {student.studentNo}, 이름: {student.studentName}
            <button onClick={() => handleRemoveStudent(index)}>제거</button>
          </div>
        ))}
      </div>
      <div className='modal-footer'>
        <button onClick={handleConfirm}>확인</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  )
}

export default ClassModal
