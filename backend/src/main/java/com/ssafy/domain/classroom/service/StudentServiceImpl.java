package com.ssafy.domain.classroom.service;

import com.ssafy.domain.classroom.dto.StudentDto;
import com.ssafy.domain.classroom.dto.StudentMapper;
import com.ssafy.domain.classroom.entity.Student;
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
}
