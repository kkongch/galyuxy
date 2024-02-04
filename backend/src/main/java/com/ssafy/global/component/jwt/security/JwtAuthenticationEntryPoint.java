package com.ssafy.global.component.jwt.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.global.common.dto.Message;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.ssafy.global.exception.GlobalError.CERTIFICATION_NOT_TOKEN;

@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        // 자격 증명 없이 접근시, 401 응답
        log.info("자격 증명 없이 접근한 경우");
        setResponse(response);

        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(Message.fail(null, CERTIFICATION_NOT_TOKEN.getErrorMessage())));
    }

    private void setResponse(HttpServletResponse response) {
        response.setStatus(CERTIFICATION_NOT_TOKEN.getHttpStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("utf-8");
    }

}
