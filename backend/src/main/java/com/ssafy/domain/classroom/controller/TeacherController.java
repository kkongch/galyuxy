package com.ssafy.domain.classroom.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        teacherService.saveOne(teacherReq);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    ResponseEntity<List<TeacherRes>> getTeacherList() {
        List<Teacher> teacherList = teacherService.findAll();
        List<TeacherRes> teacherResList = teacherList.stream()
                .map(TeacherRes::of)
                .collect(Collectors.toList());
        return new ResponseEntity<List<TeacherRes>>(teacherResList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    ResponseEntity<TeacherRes> getTeacher(@PathVariable("id") Long id) {
        Optional<Teacher> teacher = teacherService.findOne(id);
        teacher.orElseThrow(() -> new TeacherException("Could not find teacher : " + id));
        return new ResponseEntity<TeacherRes>(TeacherRes.of(teacher.get()), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    ResponseEntity<TeacherRes> putTeacher(@RequestBody TeacherReq teacherReq, @PathVariable("id") Long id) {
        Teacher teacher = teacherService.updateOne(teacherReq, id);
        return new ResponseEntity<TeacherRes>(TeacherRes.of(teacher), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    void deleteTeacher(@PathVariable("id") Long id) {
        teacherService.deleteOne(id);
    }
}
