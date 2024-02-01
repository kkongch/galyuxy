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

    @Autowired
    private TeacherRepository teacherRepository;


    @Override
    public Teacher postOne(TeacherReq teacherReq) {
        Teacher teacher = Teacher.builder()
                .name(teacherReq.getName())
                .email(teacherReq.getEmail())
                .password(teacherReq.getPassword())
                .build();
        return teacherRepository.save(teacher);
    }

    @Override
    public List<Teacher> getAll() {
        return teacherRepository.findAll();
    }

    @Override
    public Optional<Teacher> getOne(Integer id) {
        return teacherRepository.findById(id);
    }

    @Override
    public Teacher updateOne(TeacherReq teacherReq, Integer id) {
        return teacherRepository.findById(id)
                .map(existingTeacher -> {
                    Teacher updatedTeacher = Teacher.builder()
                            .id(existingTeacher.getId())
                            .name(teacherReq.getName())
                            .email(teacherReq.getEmail())
                            .password(teacherReq.getPassword())
                            .build();
                    return teacherRepository.save(updatedTeacher);
                })
                .orElseGet(() -> {
                    Teacher newTeacher = Teacher.builder()
                            .name(teacherReq.getName())
                            .email(teacherReq.getEmail())
                            .password(teacherReq.getPassword())
                            .build();
                    return teacherRepository.save(newTeacher);
                });
    }

    @Override
    public void deleteOne(Integer id) {
        teacherRepository.deleteById(id);
    }
}
