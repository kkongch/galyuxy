package com.ssafy.domain.classroom.dto;

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
    private String role;
    private boolean isDeleted;


    public static TeacherLoginActiveDto from(TokenTeacherInfoDto info) {
        return TeacherLoginActiveDto.builder()
                .id(info.getId())
                .email(info.getEmail())
                .role(info.getRole())
                .build();
    }
}
