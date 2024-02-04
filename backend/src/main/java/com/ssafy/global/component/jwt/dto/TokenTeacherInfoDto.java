package com.ssafy.global.component.jwt.dto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

import static com.ssafy.global.component.jwt.JwtUtils.*;
import static javax.management.timer.Timer.ONE_MINUTE;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TokenTeacherInfoDto {

    private int id;
    private String email;
    private String name;
    private String role;

    public Claims toClaims(int expiresMin) {
        Claims claims = Jwts.claims();

        Date now = new Date();

        claims.put(KEY_ID, this.id);
        claims.put(KEY_EMAIL, this.email);
        claims.setExpiration(new Date(now.getTime() + expiresMin * ONE_MINUTE));

        // expire 시간은 TokenProvider에서 설정
        return claims;
    }

    public static TokenTeacherInfoDto from(Claims claims) {
        return TokenTeacherInfoDto.builder()
                .id(claims.get(KEY_ID, int.class))
                .email(claims.get(KEY_EMAIL, String.class))
                .build();
    }


}
