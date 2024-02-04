package com.ssafy.global.component.jwt.service;

import com.ssafy.global.component.jwt.dto.TokenDto;
import com.ssafy.global.component.jwt.dto.TokenTeacherInfoDto;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class JwtServiceImpl implements JwtService {

    @Override
    public TokenDto issueToken(@NonNull TokenTeacherInfoDto tokenTeacherInfoDto) {
        return null;
    }

    @Override
    public TokenTeacherInfoDto parseAccessToken(@NonNull String accessToken) {
        return null;
    }

    @Override
    public TokenDto reissueToken(@NonNull String teacherEmail) {
        return null;
    }
}
