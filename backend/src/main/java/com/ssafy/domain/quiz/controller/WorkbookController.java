package com.ssafy.domain.quiz.controller;

import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.response.WorkbookRes;
import com.ssafy.domain.quiz.service.WorkbookService;
import com.ssafy.global.config.common.dto.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quiz/workbook")
public class WorkbookController {

    @Autowired
    private WorkbookService workbookService;


//    @GetMapping("/{id}")
//    ResponseEntity<WorkbookRes> getWorkbook(@PathVariable("id") Long id) {
//        Optional<Workbook> workbook = workbookService.findOne(id);
//    }

    @GetMapping
    ResponseEntity<Message<List<WorkbookRes>>> getWorkbookList(@RequestParam(name="teacherId", required=false) Integer teacherId) {

        List<Workbook> workbookList = null;
        if (teacherId != null) {
            workbookList = workbookService.findAllByTeacherId(teacherId);
        } else {
            workbookList = workbookService.findAll();
        }
        List<WorkbookRes> workbookResList = workbookList.stream()
                .map(WorkbookRes::of)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(Message.success(workbookResList));
    }

    @GetMapping("/search")
    ResponseEntity<Message<List<WorkbookRes>>> searchWorkbookList(@RequestParam(name="keyword", required=false) String keyword, @RequestParam(name="teacherName", required=false) String teacherName) {
        List<Workbook> workbookList = null;
        if (keyword != null) {
            workbookList = workbookService.findAllByKeyword(keyword);
        } else if (teacherName != null) {
            workbookList = workbookService.findAllByTeacherName(teacherName);
            System.out.println(workbookList.size());
        }
        List<WorkbookRes> workbookResList = workbookList.stream()
                .map(WorkbookRes::of)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(Message.success(workbookResList));
    }
}
