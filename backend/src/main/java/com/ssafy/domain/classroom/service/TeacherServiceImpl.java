package com.ssafy.domain.classroom.service;

import com.ssafy.domain.classroom.dto.TeacherDto;
import com.ssafy.domain.classroom.dto.TeacherLoginReqDto;
import com.ssafy.domain.classroom.dto.TeacherMapper;
import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.entity.enums.Role;
import com.ssafy.domain.classroom.exception.TeacherException;
import com.ssafy.domain.classroom.repository.TeacherRepository;
import com.ssafy.domain.classroom.request.TeacherReq;
import com.ssafy.global.component.jwt.dto.TokenTeacherInfoDto;
import com.ssafy.global.component.jwt.repository.RefreshRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    private final PasswordEncoder passwordEncoder;
    private final RefreshRepository refreshRepository;


    @Override
    public Teacher postOne(TeacherReq teacherReq) {
        Teacher teacher = Teacher.builder()
                .name(teacherReq.getName())
                .email(teacherReq.getEmail())
                .password(teacherReq.getPassword())
                .role(Role.TEACHER)
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


    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////


    @Override
    public TokenTeacherInfoDto loginCheckTeacher(TeacherLoginReqDto teacherLoginReqDto) {
        TeacherDto teacher = this.getByEmail(teacherLoginReqDto.getEmail());
        if(teacher == null) {
            throw new TeacherException("이메일을 가진 회원을 찾을 수 없음");
        }

        //패스워드 디코딩 후 비교
        if(!passwordEncoder.matches(teacherLoginReqDto.getPassword(), teacher.getPassword())) {
            throw new TeacherException("비밀번호가 일치하지 않음");
        }

        return TokenTeacherInfoDto.builder()
                .id(teacher.getId())
                .email(teacher.getEmail())
                .name(teacher.getName())
                .role(teacher.getRole())
                .build();

    }

    @Override
    public TeacherDto getByEmail(String email) {
        Optional<Teacher> teacher = teacherRepository.findByEmail(email);
        return teacher.map(TeacherMapper::toDto).orElse(null);
    }

    @Override
    public void signUp(TeacherDto teacherDto) {
        Teacher teacher = Teacher.builder()
                .name(teacherDto.getName())
                .email(teacherDto.getEmail())
                .password(passwordEncoder.encode(teacherDto.getPassword()))
                .isDeleted(false)
                .role(Role.TEACHER)
                .build();
        teacherRepository.save(teacher );
    }


}
