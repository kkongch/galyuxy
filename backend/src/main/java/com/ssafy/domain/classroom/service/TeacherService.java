package com.ssafy.domain.classroom.service;

import java.util.List;
import java.util.Optional;

import com.ssafy.domain.classroom.dto.TeacherDto;
import com.ssafy.domain.classroom.dto.TeacherLoginReqDto;
import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.request.TeacherReq;
import com.ssafy.global.component.jwt.dto.TokenTeacherInfoDto;

public interface TeacherService {
    Teacher postOne(TeacherReq teacherReq);
    List<Teacher> getAll();
    Teacher updateOne(TeacherReq teacherReq, Integer id);
    void deleteOne(Integer id);

    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////

    TokenTeacherInfoDto loginCheckTeacher(TeacherLoginReqDto teacherLoginReqDto);

    TeacherDto getByEmail(String email);

    void signUp(TeacherDto teacherDto);

    int emailDuplicateCheck(String email);

    void logout(String email);

    Optional<Teacher> getOne(Integer id);

    void joinEmail(String email);
    boolean CheckAuthCode(String email, String authCode);
}
