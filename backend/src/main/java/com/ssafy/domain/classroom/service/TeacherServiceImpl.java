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
    public Teacher saveOne(TeacherReq teacherReq) {
        Teacher teacher = Teacher.builder()
                .teacherName(teacherReq.getTeacherName())
                .teacherEmail(teacherReq.getTeacherEmail())
                .teacherPassword(teacherReq.getTeacherPassword())
                .build();
        return teacherRepository.save(teacher);
    }

    @Override
    public List<Teacher> findAll() {
        return teacherRepository.findAll();
    }

    @Override
    public Optional<Teacher> findOne(Long id) {
        return teacherRepository.findById(id);
    }

    @Override
    public Teacher updateOne(TeacherReq teacherReq, Long id) {
        return teacherRepository.findById(id)
                .map(teacher -> {
                    teacher.setTeacherName(teacherReq.getTeacherName());
                    teacher.setTeacherEmail(teacherReq.getTeacherEmail());
                    teacher.setTeacherPassword(teacherReq.getTeacherPassword());
                    return teacherRepository.save(teacher);
                })
                .orElseGet(() -> {
                    Teacher newTeacher = new Teacher();
                    newTeacher.setTeacherName(teacherReq.getTeacherName());
                    newTeacher.setTeacherEmail(teacherReq.getTeacherEmail());
                    newTeacher.setTeacherPassword(teacherReq.getTeacherPassword());
                    return teacherRepository.save(newTeacher);
                });
    }

    @Override
    public void deleteOne(Long id) {
        teacherRepository.deleteById(id);
    }
}
