package com.ssafy.domain.quiz.controller;

import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.response.WorkbookRes;
import com.ssafy.domain.quiz.service.WorkbookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quiz/workbooks")
public class WorkbookController {

    @Autowired
    private WorkbookService workbookService;

    @GetMapping
    ResponseEntity<List<WorkbookRes>> getWorkbookList() {
        List<Workbook> workbookList = workbookService.findAll();
        List<WorkbookRes> workbookResList = workbookList.stream()
                .map(WorkbookRes::of)
                .collect(Collectors.toList());
        return new ResponseEntity<List<WorkbookRes>>(workbookResList, HttpStatus.OK);
    }
}
