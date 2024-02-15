package com.ssafy.domain.classroom.controller;

import com.ssafy.domain.classroom.dto.*;
import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.service.GroupService;
import com.ssafy.domain.classroom.service.StudentService;
import com.ssafy.domain.heritage.Dto.ArtworkResultDto;
import com.ssafy.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin
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
//    @PreAuthorize("hasAuthority('TEACHER')")
    ResponseEntity<Message<List<StudentDto>>> getGroupDetail(@PathVariable("groupId") Integer groupId) {
        List<StudentDto> studentDtoList = studentService.getStudentListByGroupId(groupId);
        return ResponseEntity.ok().body(Message.success(studentDtoList));
    }

    // 그룹 및 그룹 내 학생 리스트 수정 + 추가
    @PutMapping("/modify")
    @PreAuthorize("hasAuthority('TEACHER')")
    ResponseEntity<Message<Void>> putGroupAndStudents(@AuthenticationPrincipal TeacherLoginActiveDto teacherLoginActiveDto,
                                                       @RequestBody GroupStudentsDto request) {

        //그룹 이름 업데이트
        Group group = groupService.updateName(request.getGroup());
        if(group == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Message.fail(String.valueOf(HttpStatus.NOT_FOUND), "해당 그룹이 존재하지 않음"));
        }
        
        //그룹id로 기존 학생 리스트 가져오기
        List<StudentDto> existStudent = studentService.getStudentListByGroupId(request.getGroup().getId() );
        List<StudentDto> updateStudent = request.getStudents(); // 새로 입력받은 학생 리스트

        Set<Integer> updateStudentIdSet = new HashSet<>();
        for (StudentDto updateS : updateStudent) {
//            System.out.println(studentDto.toString());
            // id가 있는 학생 = 기존에 추가된 학생
            if(updateS.getId() != 0){
                updateStudentIdSet.add(updateS.getId());
            }
            // id가 없는 학생 = 새로 추가한 학생 : DB에 저장
            else {
                studentService.saveStudent(updateS, group);
            }
        }
//        System.out.println(updateStudentIdSet);


        // id가 있는 학생과 기존 학생 비교해서 삭제된 기존 학생 찾아서 DB 삭제컬럼 업데이트
        for (StudentDto existS : existStudent) {
//            System.out.println(studentDto.toString());
            if(!updateStudentIdSet.contains(existS.getId())){
                System.out.println("delete " + existS.getId());
                studentService.delete(existS.getId());

            }
        }
        
        return ResponseEntity.ok().body(Message.success());
    }

    // 그룹 삭제 및 그룹 내 학생 리스트 삭제
    @PutMapping("/delete/{groupId}")
    @PreAuthorize("hasAuthority('TEACHER')")
    ResponseEntity<Message<Void>> deleteGroupAndStudents(@PathVariable("groupId") Integer groupId) {

        //그룹 삭제
        groupService.delete(groupId);

        //해당 그룹의 학생 리스트 가져오기
        List<StudentDto> studentList = studentService.getStudentListByGroupId(groupId);
        for (StudentDto student : studentList) {
            studentService.delete(student.getId());
        }
        return ResponseEntity.ok().body(Message.success());
    }
}
