package com.ssafy.domain.classroom.service;

import com.ssafy.domain.classroom.dto.TeacherDto;
import com.ssafy.domain.classroom.dto.TeacherLoginReqDto;
import com.ssafy.domain.classroom.dto.TeacherMapper;
import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.entity.enums.Role;
import com.ssafy.domain.classroom.exception.ClassroomException;
import com.ssafy.domain.classroom.repository.TeacherRepository;
import com.ssafy.domain.classroom.request.TeacherReq;
import com.ssafy.global.component.jwt.dto.TokenTeacherInfoDto;
import com.ssafy.global.component.jwt.repository.RefreshRepository;
import com.ssafy.global.redis.dto.RedisUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.SQLOutput;
import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    private final PasswordEncoder passwordEncoder;
    private final RefreshRepository refreshRepository;

    private final JavaMailSender mailSender;

    @Autowired
    private RedisUtil redisUtil;

    @Value("${spring.mail.auth-code-expiration-millis}")
    private long authCodeExpirationMillis;

    @Override
    public Teacher postOne(TeacherReq teacherReq) {
        Teacher teacher = Teacher.builder()
                .name(teacherReq.getName())
                .email(teacherReq.getEmail())
                .password(teacherReq.getPassword())
                .role(Role.TEACHER)
                .build();
        return teacherRepository.save(teacher);
    }

    @Override
    public List<Teacher> getAll() {
        return teacherRepository.findAll();
    }


    @Override
    public Teacher updateOne(TeacherReq teacherReq, Integer id) {
        return teacherRepository.findById(id)
                .map(existingTeacher -> {
                    Teacher updatedTeacher = Teacher.builder()
                            .id(existingTeacher.getId())
                            .name(teacherReq.getName())
                            .email(teacherReq.getEmail())
                            .password(teacherReq.getPassword())
                            .build();
                    return teacherRepository.save(updatedTeacher);
                })
                .orElseGet(() -> {
                    Teacher newTeacher = Teacher.builder()
                            .name(teacherReq.getName())
                            .email(teacherReq.getEmail())
                            .password(teacherReq.getPassword())
                            .build();
                    return teacherRepository.save(newTeacher);
                });
    }

    @Override
    public void deleteOne(Integer id) {
        teacherRepository.deleteById(id);
    }


    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////


    @Override
    public TokenTeacherInfoDto loginCheckTeacher(TeacherLoginReqDto teacherLoginReqDto) {
        TeacherDto teacher = this.getByEmail(teacherLoginReqDto.getEmail());
        if(teacher == null) {
            throw new ClassroomException("이메일을 가진 회원을 찾을 수 없음");
        }

        //패스워드 디코딩 후 비교
        if(!passwordEncoder.matches(teacherLoginReqDto.getPassword(), teacher.getPassword())) {
            throw new ClassroomException("비밀번호가 일치하지 않음");
        }

        return TokenTeacherInfoDto.builder()
                .id(teacher.getId())
                .email(teacher.getEmail())
                .name(teacher.getName())
                .role(String.valueOf(teacher.getRole()))
                .build();

    }

    @Override
    public TeacherDto getByEmail(String email) {
        Optional<Teacher> teacher = teacherRepository.findByEmail(email);
        return teacher.map(TeacherMapper::toDto).orElse(null);
    }

    @Override
    public void signUp(TeacherDto teacherDto) {
        Teacher teacher = Teacher.builder()
                .name(teacherDto.getName())
                .email(teacherDto.getEmail())
                .password(passwordEncoder.encode(teacherDto.getPassword()))
                .isDeleted(false)
                .role(Role.TEACHER)
                .build();
        teacherRepository.save(teacher );
    }

    @Override
    public int emailDuplicateCheck(String email) {
        int emailCheck = teacherRepository.countByEmail(email);
        if(emailCheck == 1)
            throw new ClassroomException("이미 사용중인 메일입니다.");
        return emailCheck;
    }

    @Override
    public void logout(String email) {
        try {
            refreshRepository.delete(email);
        } catch(Exception e) {
            throw new ClassroomException("이미 로그아웃됨");
        }
    }

    @Override
    public Optional<Teacher> getOne(Integer id) {
        return teacherRepository.findById(id);
    }


    // 인증번호 발급
    private String createCode() {
        int lenth = 6;
        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < lenth; i++) {
                builder.append(random.nextInt(10));
            }
            System.out.println("random code " + builder.toString());
            return builder.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new ClassroomException("NO_SUCH_ALGORITHM");
        }
    }




    // 메일 발신, 수신, 인증 번호 등 형식 지정
    @Override
    public void joinEmail(String email) {
        String authCode = this.createCode();

        String setFrom = "sinsigi00@gmail.com"; // email-config에 설정한 자신의 이메일 주소를 입력
        String toMail = email;
        String title = "Galyuxy 이메일 인증 번호";
        String content =
                "Galyuxy를 방문해주셔서 감사합니다." + 	//html 형식으로 작성 !
                        "<br><br>" +
                        "인증 번호는 " + authCode + "입니다." +
                        "<br>" +
                        "인증번호를 6자리를 입력해주세요"; //이메일 내용 삽입
        mailSend(setFrom, toMail, title, content, authCode);

//        mailService.sendEmail(toEmail, title, authCode);
        // 이메일 인증 요청 시 인증 번호 Redis에 저장 ( key = "AuthCode " + Email / value = AuthCode )
//        redisService.setValues(AUTH_CODE_PREFIX + email,
//                authCode, Duration.ofMillis(this.authCodeExpirationMillis));
    }

    //이메일 전송
    public void mailSend(String setFrom, String email, String title, String content, String authCode) {
        MimeMessage message = mailSender.createMimeMessage();//JavaMailSender 객체를 사용하여 MimeMessage 객체를 생성
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message,true,"utf-8");//이메일 메시지와 관련된 설정을 수행합니다.
            // true를 전달하여 multipart 형식의 메시지를 지원하고, "utf-8"을 전달하여 문자 인코딩을 설정
            helper.setFrom(setFrom);//이메일의 발신자 주소 설정
            helper.setTo(email);//이메일의 수신자 주소 설정
            helper.setSubject(title);//이메일의 제목을 설정
            helper.setText(content,true);//이메일의 내용 설정 두 번째 매개 변수에 true를 설정하여 html 설정으로한다.
            mailSender.send(message);

            redisUtil.setDataExpire( authCode,  email, Duration.ofMillis(this.authCodeExpirationMillis));
        } catch (MessagingException e) {//이메일 서버에 연결할 수 없거나, 잘못된 이메일 주소를 사용하거나, 인증 오류가 발생하는 등 오류
            // 이러한 경우 MessagingException이 발생
            e.printStackTrace();//e.printStackTrace()는 예외를 기본 오류 스트림에 출력하는 메서드
//            throw new RuntimeException(e);
            throw new ClassroomException(e.toString());
        }

    }


    // 인증 번호, 교사가 입력한 인증 번호 확인
    @Override
    public boolean CheckAuthCode(String email, String authCode){
        System.out.println("cchecck code" + email + "/ " + authCode);
        String value = redisUtil.getData(authCode);
        if(value.equals(email)){
            return true;
        }
        else if(value == null ){
            return false;
        }
        else{
            return false;
        }
    }



}
