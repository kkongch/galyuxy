package com.ssafy.domain.classroom.response;

import com.ssafy.domain.classroom.entity.Teacher;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherRes {

    String name;
    String email;

    public static TeacherRes of(Teacher teacher) {
        TeacherRes teacherRes = new TeacherRes();
        teacherRes.setName(teacher.getName());
        teacherRes.setEmail(teacher.getEmail());
        return teacherRes;
    }
}
