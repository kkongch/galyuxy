package com.ssafy.global.component.jwt.service;

import com.ssafy.global.component.jwt.dto.TokenDto;
import com.ssafy.global.component.jwt.dto.TokenTeacherInfoDto;
import lombok.NonNull;
public interface JwtService {
    // 토큰 발급
    TokenDto issueToken(@NonNull TokenTeacherInfoDto tokenTeacherInfoDto);

    // access 토큰 파싱
    TokenTeacherInfoDto parseAccessToken(@NonNull String accessToken);

    // Redis에 저장된 이메일을 통한 Access, Refresh 토큰 재발급
    TokenDto reissueToken(@NonNull String teacherEmail);

}
