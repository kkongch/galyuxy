package com.ssafy.domain.classroom.dto;

import com.ssafy.global.component.jwt.dto.TokenDto;
import com.ssafy.global.component.jwt.dto.TokenTeacherInfoDto;
import lombok.*;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
public class TeacherLoginResDto {
    private TokenTeacherInfoDto teacherInfo;
    private TokenDto token;
}
