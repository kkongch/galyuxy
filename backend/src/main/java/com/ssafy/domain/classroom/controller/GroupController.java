package com.ssafy.domain.classroom.controller;

import com.ssafy.domain.classroom.dto.GroupDto;
import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.service.GroupService;
import com.ssafy.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/group")
@Slf4j // 로깅
public class GroupController {

    private final GroupService groupService;

    @GetMapping("/list/{id}")
    @PreAuthorize("hasAuthority('TEACHER')")
    ResponseEntity<Message<List<GroupDto>>> getGroupList(@PathVariable("id") Integer id) {
        List<GroupDto> groupList = groupService.getGroupListByTeacherId(id);
        return ResponseEntity.ok().body(Message.success(groupList));
    }
}
