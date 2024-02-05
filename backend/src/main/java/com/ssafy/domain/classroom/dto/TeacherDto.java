package com.ssafy.domain.classroom.dto;

import com.ssafy.domain.classroom.entity.enums.Role;
import lombok.*;

@Getter
@Setter
@Builder
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
