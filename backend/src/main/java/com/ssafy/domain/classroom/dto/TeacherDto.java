package com.ssafy.domain.classroom.dto;

import com.ssafy.domain.classroom.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherDto {

    private int id;
    private String name;

    private String email;
    private String password;
    private Role role;
    private boolean isDeleted;

}
