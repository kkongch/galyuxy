package com.ssafy.domain.classroom.dto;

import com.ssafy.domain.classroom.entity.Student;

import java.util.List;
import java.util.stream.Collectors;

public class StudentMapper {
    public static StudentDto toDto(Student student) {
        StudentDto dto = new StudentDto();
        dto.setId(student.getId());
        dto.setNo(student.getNo());
        dto.setName(student.getName());
        dto.setDeleted(student.isDeleted());
        return dto;
    }

    public static List<StudentDto> toDtoList(List<Student> studentList) {
        return studentList.stream().map(StudentMapper::toDto)
                .collect(Collectors.toList());
    }


    public static Student toEntity(StudentDto dto) {
        return Student.builder()
                .no(dto.getNo())
                .name(dto.getName()).isDeleted(false).build();
    }

}
