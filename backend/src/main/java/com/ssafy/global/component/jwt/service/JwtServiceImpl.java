package com.ssafy.global.component.jwt.service;

import com.ssafy.global.component.jwt.JwtIssuer;
import com.ssafy.global.component.jwt.JwtParser;
import com.ssafy.global.component.jwt.JwtUtils;
import com.ssafy.global.component.jwt.dto.TokenDto;
import com.ssafy.global.component.jwt.dto.TokenTeacherInfoDto;
import com.ssafy.global.component.jwt.repository.RefreshRepository;
import com.ssafy.global.exception.GlobalError;
import com.ssafy.global.exception.TokenException;
import io.jsonwebtoken.Claims;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.ssafy.global.component.jwt.JwtUtils.BEARER_PREFIX;


@Slf4j
@RequiredArgsConstructor
@Service
public class JwtServiceImpl implements JwtService {
    private final JwtUtils jwtUtils;
    private final JwtIssuer jwtIssuer;
    private final JwtParser jwtParser;
    private final RefreshRepository refreshRepository;
    @Override
    public TokenDto issueToken(@NonNull TokenTeacherInfoDto tokenTeacherInfoDto) {
        String accessToken = jwtIssuer.issueToken(
                tokenTeacherInfoDto.toClaims(jwtUtils.getAccessTokenExpiredMin()), jwtUtils.getEncodedAccessKey()
        );

        String refreshToken = jwtIssuer.issueToken(
                tokenTeacherInfoDto.toClaims(jwtUtils.getRefreshTokenExpiredMin()), jwtUtils.getEncodedRefreshKey()
        );

        try {
            // refreshToekn redis에 저장
            refreshRepository.save(tokenTeacherInfoDto.getEmail(), refreshToken, jwtUtils.getRefreshTokenExpiredMin());
        }
        catch (Exception e) {
            throw new RuntimeException("Redis 연결에 실패했습니다.");
        }

        return TokenDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpiresIn(jwtUtils.getAccessTokenExpiredMin())
                .grantType(BEARER_PREFIX)
                .build();
    }

    // access 토큰 파싱
    @Override
    public TokenTeacherInfoDto parseAccessToken(@NonNull String accessToken) {
        Claims claims = jwtParser.parseToken(accessToken, jwtUtils.getEncodedAccessKey());
        if(claims == null) {
            return null;
        }
        return TokenTeacherInfoDto.from(claims);
    }

    @Override
    public TokenDto reissueToken(@NonNull String teacherEmail) {
        String refreshToken = refreshRepository.find(teacherEmail)
                .orElseThrow(() -> new TokenException(GlobalError.REDIS_NOT_TOKEN));
        Claims claims = jwtParser.parseToken(refreshToken, jwtUtils.getEncodedRefreshKey());
        return issueToken(TokenTeacherInfoDto.from(claims));
    }
}
