package com.ssafy.domain.classroom.service;

import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.repository.TeacherRepository;
import com.ssafy.domain.classroom.request.TeacherReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;


    @Override
    public Teacher postOne(TeacherReq teacherReq) {
        Teacher teacher = Teacher.builder()
                .teacherName(teacherReq.getTeacherName())
                .teacherEmail(teacherReq.getTeacherEmail())
                .teacherPassword(teacherReq.getTeacherPassword())
                .build();
        return teacherRepository.save(teacher);
    }

    @Override
    public List<Teacher> getAll() {
        return teacherRepository.findAll();
    }

    @Override
    public Optional<Teacher> getOne(Long id) {
        return teacherRepository.findById(id);
    }
}
