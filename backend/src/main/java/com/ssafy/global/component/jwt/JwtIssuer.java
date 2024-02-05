package com.ssafy.global.component.jwt;

import java.security.Key;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtIssuer {
    // 토큰 생성해주는 메서드
    public String issueToken(@NonNull Claims claims, @NonNull Key secretKey) {
        return Jwts.builder()
                .setClaims(claims)
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }
}
