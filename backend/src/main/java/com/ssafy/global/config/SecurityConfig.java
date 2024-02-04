package com.ssafy.global.config;


import com.ssafy.global.component.jwt.security.JwtAccessDeniedHandler;
import com.ssafy.global.component.jwt.security.JwtAuthenticationEntryPoint;
import com.ssafy.global.component.jwt.security.JwtAuthenticationFilter;
import com.ssafy.global.component.jwt.service.JwtService;
import com.ssafy.global.exception.ExceptionHandlerFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig {

    private final JwtService jwtService;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Spring Security 6.1.0 부터는 메서드 체이닝의 사용을 지양하고 람다식을 통해 함수형으로 설정 지향함
        http.authorizeRequests((authorizeRequests) ->
                authorizeRequests
                        .anyRequest().permitAll());

        http.headers((headerConfig) ->
                headerConfig.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));

        http.sessionManagement((sessionManage) ->
                sessionManage.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.cors((corsConfigurer) ->
                        corsConfigurer.configurationSource(corsConfigurationSource()))
                .httpBasic(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement((sessionManagementConfigurer) ->
                        sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.formLogin(AbstractHttpConfigurer::disable);
        http.logout(AbstractHttpConfigurer::disable);

        http.exceptionHandling((exceptionHandling) ->
                exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler(jwtAccessDeniedHandler));

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(exceptionHandlerFilter(), JwtAuthenticationFilter.class);

        return http.build();
    }

    // cors관련 설정 파일 커스텀
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // 패스워드 암호화
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtService);
    }

    @Bean
    public ExceptionHandlerFilter exceptionHandlerFilter() {
        return new ExceptionHandlerFilter();
    }
}

