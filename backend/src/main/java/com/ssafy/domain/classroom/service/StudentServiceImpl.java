package com.ssafy.domain.classroom.service;

import com.ssafy.domain.classroom.dto.StudentDto;
import com.ssafy.domain.classroom.dto.StudentMapper;
import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.entity.Student;
import com.ssafy.domain.classroom.exception.ClassroomException;
import com.ssafy.domain.classroom.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService{

    @Autowired
    private final StudentRepository studentRepository;

    @Override
    public Optional<Student> getStudentById(int studentId) {
        return studentRepository.findById(studentId);
    }

    @Override
    public List<StudentDto> getStudentListByGroupId(int groupId) {
        List<Student> list = studentRepository.findAllByGroupIdAndIsDeletedFalse(groupId);
        return StudentMapper.toDtoList(list);
    }

    @Override
    public void saveStudent(StudentDto student, Group group) {
        Student newStudent = StudentMapper.toEntity(student);
        newStudent.setGroup(group);
        studentRepository.save(newStudent);
    }

    @Override
    public void delete(int studentId) {
        Student student = getStudentById(studentId).orElse(null);

        if (student != null) {
            student.setDeleted(true);
            studentRepository.save(student);
        }else{
            throw new ClassroomException("해당 학생을 찾을 수 없음. id : " + studentId);
        }
    }
}
