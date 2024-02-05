package com.ssafy.domain.classroom.dto;

import com.ssafy.domain.classroom.entity.enums.Role;
import com.ssafy.global.component.jwt.dto.TokenTeacherInfoDto;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class TeacherLoginActiveDto {
    private int id;
    private String name;
    private String email;
    private Role role;
    private boolean isDeleted;


    public static TeacherLoginActiveDto from(TokenTeacherInfoDto info) {
        return TeacherLoginActiveDto.builder()
                .id(info.getId())
                .email(info.getEmail())
                .role(Role.valueOf(info.getRole()))
                .build();
    }
}
