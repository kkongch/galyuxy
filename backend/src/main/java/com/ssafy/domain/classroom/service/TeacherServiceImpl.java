package com.ssafy.domain.classroom.service;

import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.repository.TeacherRepository;
import com.ssafy.domain.classroom.request.TeacherReq;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private TeacherRepository teacherRepository;

    @Override
    public Teacher saveOne(TeacherReq teacherReq) {
        Teacher teacher = Teacher.builder()
                .name(teacherReq.getName())
                .email(teacherReq.getEmail())
                .password(teacherReq.getPassword())
                .build();
        return teacherRepository.save(teacher);
    }

    @Override
    public List<Teacher> findAll() {
        return teacherRepository.findAll();
    }

    @Override
    public Optional<Teacher> findOne(Integer id) {
        return teacherRepository.findById(id);
    }

    @Override
    public Teacher updateOne(TeacherReq teacherReq, Integer id) {
        return teacherRepository.findById(id)
                .map(teacher -> {
                    teacher.setName(teacherReq.getName());
                    teacher.setEmail(teacherReq.getEmail());
                    teacher.setPassword(teacherReq.getPassword());
                    return teacherRepository.save(teacher);
                })
                .orElseGet(() -> {
                    Teacher newTeacher = new Teacher();
                    newTeacher.setName(teacherReq.getName());
                    newTeacher.setEmail(teacherReq.getEmail());
                    newTeacher.setPassword(teacherReq.getPassword());
                    return teacherRepository.save(newTeacher);
                });
    }

    @Override
    public void deleteOne(Integer id) {
        teacherRepository.deleteById(id);
    }
}
