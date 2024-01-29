package com.ssafy.domain.classroom.service;

import java.util.List;
import java.util.Optional;

import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.request.TeacherReq;

public interface TeacherService {
    Teacher saveOne(TeacherReq teacherReq);
    List<Teacher> findAll();
    Optional<Teacher> findOne(Long id);
    Teacher updateOne(TeacherReq teacherReq, Long id);
    void deleteOne(Long id);
}
