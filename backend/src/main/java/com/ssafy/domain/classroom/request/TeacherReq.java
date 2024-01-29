package com.ssafy.domain.classroom.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.response.TeacherRes;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class TeacherReq {

    String teacherName;
    String teacherEmail;
    String teacherPassword;
}
