package com.ssafy.global.component.jwt.security;


import com.ssafy.domain.classroom.dto.TeacherLoginActiveDto;
import com.ssafy.global.component.jwt.dto.TokenTeacherInfoDto;
import com.ssafy.global.component.jwt.service.JwtService;
import com.ssafy.global.exception.GlobalError;
import com.ssafy.global.exception.TokenException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    private final JwtService jwtService;

    // JWT 토큰의 인증 정보를 현재 쓰레드의 SecirityContext에 저장하는 역할 수행하는 필터
    // 실제 필터링 로직은 doFilterInternal에 들어감
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Request Header에서 JWT 토큰을 추출
        String jwt = getJwtToken(request);
        // 추출된 JWT로 사용자 인증 시도
        authenticate(request, jwt);
        // 필터 체인을 계속 진행
        filterChain.doFilter(request, response);
    }

    // Request Header에서 토큰 정보를 꺼내오기
    public String getJwtToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // JWT 토큰을 사용하여 사용자 인증
    public void authenticate(HttpServletRequest request, String token) {
        TokenTeacherInfoDto tokenTeacherInfoDto = null;
        if(StringUtils.hasText(token)) {
            tokenTeacherInfoDto = jwtService.parseAccessToken(token);
            try {
                TeacherLoginActiveDto loginActiveDto = TeacherLoginActiveDto.from(tokenTeacherInfoDto);
                saveLoginTeacherInSecurityContext(loginActiveDto);
            } catch(RuntimeException e) {
                SecurityContextHolder.clearContext();
                throw new TokenException(GlobalError.INVALID_TOKEN);
            }
        }
    }

    // Spring security의 SecurityContextHolder에 사용자 정보 저장
    private static void saveLoginTeacherInSecurityContext(TeacherLoginActiveDto tokenTeacherInfoDto) {
        JwtAuthenticationToken authentication = new JwtAuthenticationToken(
                tokenTeacherInfoDto, "", Arrays.asList(new SimpleGrantedAuthority(tokenTeacherInfoDto.getRole().toString()))
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}