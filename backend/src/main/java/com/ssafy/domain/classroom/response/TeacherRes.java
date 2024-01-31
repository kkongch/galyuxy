package com.ssafy.domain.classroom.response;

import com.ssafy.domain.classroom.entity.Teacher;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherRes {

    String teacherName;
    String teacherEmail;

    public static TeacherRes of(Teacher teacher) {
        TeacherRes teacherRes = new TeacherRes();
        teacherRes.setTeacherName(teacher.getName());
        teacherRes.setTeacherEmail(teacher.getEmail());
        return teacherRes;
    }
}
