package com.ssafy.domain.quiz.controller;

import com.ssafy.domain.quiz.entity.Question;
import com.ssafy.domain.quiz.request.WorkbookReq;
import com.ssafy.domain.quiz.response.QuestionRes;
import com.ssafy.domain.quiz.service.QuestionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.response.WorkbookRes;
import com.ssafy.domain.quiz.service.WorkbookService;
import com.ssafy.global.common.dto.Message;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/quiz/workbook")
@RequiredArgsConstructor
public class WorkbookController {

    private final WorkbookService workbookService;
    private final QuestionService questionService;

    @PostMapping
    ResponseEntity<Message<WorkbookRes>> postWorkbook(@RequestBody WorkbookReq workbookReq) {
        try {
            Workbook workbook = workbookService.postOne(workbookReq);
            return ResponseEntity.ok().body(Message.success(WorkbookRes.of(workbook), "OK", null));
        } catch (EntityNotFoundException entityNotFoundException) {
            throw entityNotFoundException;
        }
    }
    @GetMapping
    ResponseEntity<Message<List<WorkbookRes>>> getWorkbookList(@RequestParam(name="teacherId", required=false) Integer teacherId) {

        List<Workbook> workbookList = null;
        if (teacherId != null) {
            workbookList = workbookService.getAllByTeacherId(teacherId);
        } else {
            workbookList = workbookService.getAll();
        }
        List<WorkbookRes> workbookResList = workbookList.stream()
                .map(WorkbookRes::of)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(Message.success(workbookResList, "OK", null));
    }

    @GetMapping("/search")
    ResponseEntity<Message<List<WorkbookRes>>> searchWorkbookList(@RequestParam(name="keyword", required=false) String keyword, @RequestParam(name="teacherName", required=false) String teacherName) {
        List<Workbook> workbookList = null;
        if (keyword != null) {
            workbookList = workbookService.getAllByKeyword(keyword);
        } else if (teacherName != null) {
            workbookList = workbookService.getAllByTeacherName(teacherName);
        }
        List<WorkbookRes> workbookResList = workbookList.stream()
                .map(WorkbookRes::of)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(Message.success(workbookResList, "OK", null));
    }

    @GetMapping("/{workbookId}/questions")
    ResponseEntity<Message<List<QuestionRes>>> getQuestionListByWorkbookId(@PathVariable(name="workbookId") Integer workbookId) {
        List<Question> questionList = questionService.findAllByWorkbookId(workbookId);
        List<QuestionRes> questionResList = questionList.stream()
                .map(QuestionRes::of)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(Message.success(questionResList, "OK", null));
    }

    @PutMapping("/{id}")
    ResponseEntity<Message<Void>> deleteWorkbook(@PathVariable("id") Integer id) {
        workbookService.deleteOne(id);
        return ResponseEntity.ok().body(Message.success(null, "OK", null));
    }
}
