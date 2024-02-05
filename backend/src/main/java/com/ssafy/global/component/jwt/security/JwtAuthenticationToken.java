package com.ssafy.global.component.jwt.security;


import com.ssafy.domain.classroom.dto.TeacherLoginActiveDto;
import lombok.Getter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private TeacherLoginActiveDto pricipal;
    private Object credentials;

    public JwtAuthenticationToken(TeacherLoginActiveDto pricipal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.pricipal = pricipal;
        this.credentials = credentials;
        super.setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return this.credentials;
    }

    @Override
    public Object getPrincipal() {
        return this.pricipal;
    }
}

