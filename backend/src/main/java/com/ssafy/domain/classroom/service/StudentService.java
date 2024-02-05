package com.ssafy.domain.classroom.service;


import com.ssafy.domain.classroom.dto.StudentDto;
import com.ssafy.domain.classroom.entity.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {

    Optional<Student> getStudentById(int studentId);
    List<StudentDto> getStudentListByGroupId(int groupId);
}
