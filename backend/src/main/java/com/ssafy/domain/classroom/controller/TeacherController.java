package com.ssafy.domain.classroom.controller;

import java.util.Optional;

import com.ssafy.domain.classroom.dto.*;
import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.entity.enums.Role;
import com.ssafy.domain.classroom.exception.ClassroomException;
import com.ssafy.domain.classroom.request.TeacherReq;
import com.ssafy.domain.classroom.response.TeacherRes;
import com.ssafy.domain.classroom.service.TeacherService;
import com.ssafy.global.common.dto.Message;
import com.ssafy.global.component.jwt.dto.TokenDto;
import com.ssafy.global.component.jwt.dto.TokenTeacherInfoDto;
import com.ssafy.global.component.jwt.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/teachers")
@Slf4j // 로깅
public class TeacherController {

    private final TeacherService teacherService;
    private final JwtService jwtService;

    @PostMapping
    ResponseEntity postTeacher(@RequestBody TeacherReq teacherReq) {
        System.out.println(teacherReq);
        teacherService.postOne(teacherReq);
        return new ResponseEntity(HttpStatus.OK);
    }

//    @GetMapping
//    ResponseEntity<List<TeacherRes>> getTeacherList() {
//        List<Teacher> teacherList = teacherService.getAll();
//        List<TeacherRes> teacherResList = teacherList.stream()
//                .map(TeacherRes::of)
//                .collect(Collectors.toList());
//        return new ResponseEntity<List<TeacherRes>>(teacherResList, HttpStatus.OK);
//    }


    @PutMapping("/{id}")
    ResponseEntity<TeacherRes> putTeacher(@RequestBody TeacherReq teacherReq, @PathVariable("id") Integer id) {
        Teacher teacher = teacherService.updateOne(teacherReq, id);
        return new ResponseEntity<TeacherRes>(TeacherRes.of(teacher), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    void deleteTeacher(@PathVariable("id") Integer id) {
        teacherService.deleteOne(id);
    }

    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////

    @PostMapping("/signup")
    public ResponseEntity<Message<Void>> signUp(@RequestBody TeacherDto teacherDto) {
        teacherService.signUp(teacherDto);
        return ResponseEntity.ok().body(Message.success());
    }

    // 이메일 체크
    @GetMapping("/checkDuplicate/{teacherEmail}")
    public ResponseEntity<Message<Void>> logout(@PathVariable String teacherEmail) {
        int emailCheck = teacherService.emailDuplicateCheck(teacherEmail);
        return ResponseEntity.ok().body(Message.success());
    }

    // 이메일 전송
    @PostMapping("/emailSend")
    public ResponseEntity<Message<Void>> mailSend(@RequestBody  EmailCheckDto email){
        System.out.println("이메일 인증 이메일 : "+ email.getEmail());
        teacherService.joinEmail(email.getEmail());
        return ResponseEntity.ok().body(Message.success());
    }

    // 이메일 인증 번호 확인
    @PostMapping("/emailVerify")
    public ResponseEntity<Message<Void>> AuthCheck(@RequestBody EmailCheckDto emailCheckDto){
        boolean Checked= teacherService.CheckAuthCode(emailCheckDto.getEmail(),emailCheckDto.getAuthCode());
        if(Checked){
//            System.out.println("success ");
            return ResponseEntity.ok().body(Message.success());
        }
        else{
//            System.out.println("fail");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Message.fail(String.valueOf(HttpStatus.NOT_FOUND), "이메일 인증 실패"));
        }
    }




    @PostMapping("/login")
    public ResponseEntity<Message<TeacherLoginResDto>> login(@RequestBody TeacherLoginReqDto teacherLoginReqDto,
                                                             HttpServletResponse response) {
        TokenTeacherInfoDto tokenTeacherInfoDto = teacherService.loginCheckTeacher(teacherLoginReqDto);
        TokenDto tokenDto = jwtService.issueToken(tokenTeacherInfoDto);
        TeacherLoginResDto teacherLoginResDto =TeacherLoginResDto.builder()
                .teacherInfo(tokenTeacherInfoDto)
                .token(tokenDto)
                .build();

        // JWT 토큰 쿠키에 저장
        Cookie accessTokenCookie = new Cookie("accessToken", tokenDto.getAccessToken());
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(3600); // 3600초
        response.addCookie(accessTokenCookie);

        return ResponseEntity.ok().body(Message.success(teacherLoginResDto));
    }

    @GetMapping("/logout")
    @PreAuthorize("hasAuthority('TEACHER')")
    public ResponseEntity<Message<Void>> logout(@AuthenticationPrincipal TeacherLoginActiveDto teacherLoginActiveDto,
                                                      HttpServletResponse response) {
        teacherService.logout(teacherLoginActiveDto.getEmail());

        // 쿠키 삭제
        Cookie accessTokenCookie = new Cookie("accessToken", null);
        accessTokenCookie.setMaxAge(0);
        accessTokenCookie.setPath("/");
        response.addCookie(accessTokenCookie);
        return ResponseEntity.ok().body(Message.success());
    }


    @GetMapping()
    @PreAuthorize("hasAuthority('TEACHER')")
    ResponseEntity<Message<TeacherDto>> getTeacher(@AuthenticationPrincipal TeacherLoginActiveDto teacherLoginActiveDto) {
        Optional<Teacher> teacher = teacherService.getOne(teacherLoginActiveDto.getId());
        teacher.orElseThrow(() -> new ClassroomException("Could not find teacher : " + teacherLoginActiveDto.getId()));
        TeacherDto teacherDto = TeacherDto.builder()
                .id(teacher.get().getId())
                .name(teacher.get().getName())
                .email(teacher.get().getEmail())
                .role(Role.TEACHER)
                .isDeleted(teacher.get().isDeleted())
                .build();


        return ResponseEntity.ok().body(Message.success(teacherDto));
    }

}
