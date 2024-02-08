package com.ssafy.global.email.service;

public class MailServiceImpl {
    private String createMessage(String to, boolean signUpCheck, String key) {
        StringBuilder sb = new StringBuilder();

        sb.append("아래 코드를 복사해 입력해주세요.").append("<br><br>");

        if(signUpCheck) {
            sb.append("회원가입 메일 인증 코드: ");
        } else {
            sb.append("임시 비밀번호 재발급 코드: ");
        }

        sb.append(key);

        return sb.toString();
    }
}
