package com.ssafy.domain.classroom.controller;

import java.util.List;
import java.util.Optional;

import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.exception.TeacherException;
import com.ssafy.domain.classroom.request.TeacherReq;
import com.ssafy.domain.classroom.response.TeacherRes;
import com.ssafy.domain.classroom.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/teachers")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping
    ResponseEntity postTeacher(@RequestBody TeacherReq teacherReq) {
        System.out.println(teacherReq);
        teacherService.postOne(teacherReq);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    List<Teacher> getTeacherList() {
        return teacherService.getAll();
    }

    @GetMapping("/{id}")
    ResponseEntity<TeacherRes> getTeacher(@PathVariable("id") Long id) {
        Optional<Teacher> teacher = teacherService.getOne(id);
        System.out.println(teacher.get().toString());
        teacher.orElseThrow(() -> new TeacherException("Could not find teacher : " + id));
        return new ResponseEntity<TeacherRes>(TeacherRes.of(teacher.get()), HttpStatus.OK);
    }
}
