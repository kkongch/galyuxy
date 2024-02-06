package com.ssafy.domain.classroom.controller;

import com.ssafy.domain.classroom.dto.*;
import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.service.GroupService;
import com.ssafy.domain.classroom.service.StudentService;
import com.ssafy.domain.heritage.Dto.ArtworkResultDto;
import com.ssafy.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/group")
@Slf4j // 로깅
public class GroupController {

    private final GroupService groupService;
    private final StudentService studentService;


    // 그룹 생성 + 학생 추가
    @PostMapping
    @PreAuthorize("hasAuthority('TEACHER')")
    ResponseEntity<Message<Void>> postGroupAndStudents(@AuthenticationPrincipal TeacherLoginActiveDto teacherLoginActiveDto,
                                                       @RequestBody GroupStudentsDto request) {
        groupService.saveGroupAndStudents(teacherLoginActiveDto.getId(), request);

        return ResponseEntity.ok().body(Message.success());
    }

    // 교사가 가진 그룹 리스트 조회
    @GetMapping("/list")
    @PreAuthorize("hasAuthority('TEACHER')")
    ResponseEntity<Message<List<GroupDto>>> getGroupList(@AuthenticationPrincipal TeacherLoginActiveDto teacherLoginActiveDto) {
        List<GroupDto> groupList = groupService.getGroupListByTeacherId(teacherLoginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(groupList));
    }

    // 그룹 내 학생 리스트 조회
    @GetMapping("/detail/{groupId}")
    @PreAuthorize("hasAuthority('TEACHER')")
    ResponseEntity<Message<List<StudentDto>>> getGroupDetail(@PathVariable("groupId") Integer groupId) {
        List<StudentDto> studentDtoList = studentService.getStudentListByGroupId(groupId);
        return ResponseEntity.ok().body(Message.success(studentDtoList));
    }



}
