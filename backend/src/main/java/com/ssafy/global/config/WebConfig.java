package com.ssafy.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // 허용할 오리진(도메인) 설정
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메소드 설정
                .allowCredentials(true) // 인증정보(쿠키)를 허용할지 여부 설정
                .maxAge(3600); // preflight 요청의 캐시 시간 설정
    }
}
