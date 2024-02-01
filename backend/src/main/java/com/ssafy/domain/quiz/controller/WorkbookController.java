package com.ssafy.domain.quiz.controller;

import com.ssafy.domain.quiz.entity.Question;
import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.response.QuestionRes;
import com.ssafy.domain.quiz.response.WorkbookRes;
import com.ssafy.domain.quiz.service.QuestionService;
import com.ssafy.domain.quiz.service.WorkbookService;
import com.ssafy.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quiz/workbook")
@RequiredArgsConstructor
public class WorkbookController {

    private final WorkbookService workbookService;
    private final QuestionService questionService;

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

    @GetMapping("/{workbookId}/questions")
    ResponseEntity<Message<List<QuestionRes>>> getQuestionListByWorkbookId(@PathVariable(name="workbookId") Integer workbookId) {
        List<Question> questionList = questionService.findAllByWorkbookId(workbookId);
        List<QuestionRes> questionResList = questionList.stream()
                .map(QuestionRes::of)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(Message.success(questionResList, "OK", null));
    }
}
