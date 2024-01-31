package com.ssafy.domain.classroom.service;

import java.util.List;
import java.util.Optional;

import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.request.TeacherReq;

public interface TeacherService {
    Teacher saveOne(TeacherReq teacherReq);
    List<Teacher> findAll();
    Optional<Teacher> findOne(Integer id);
    Teacher updateOne(TeacherReq teacherReq, Integer id);
    void deleteOne(Integer id);
}
