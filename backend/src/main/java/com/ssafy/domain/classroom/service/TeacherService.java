package com.ssafy.domain.classroom.service;

import java.util.List;
import java.util.Optional;

import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.request.TeacherReq;

public interface TeacherService {
    Teacher postOne(TeacherReq teacherRea);
    List<Teacher> getAll();
    Optional<Teacher> getOne(Long id);
}
