package com.ssafy.domain.classroom.dto;

import com.ssafy.domain.classroom.entity.Teacher;

public class TeacherMapper {
    public static TeacherDto toDto(Teacher teacher){
        TeacherDto dto = new TeacherDto();
        dto.setId(teacher.getId());
        dto.setName(teacher.getName());
        dto.setEmail(teacher.getEmail());
        dto.setPassword(teacher.getPassword());
        dto.setDeleted(teacher.isDeleted());
        dto.setRole(teacher.getRole());
        return dto;
    }

}
