package com.ssafy.domain.quiz.controller;

import com.ssafy.domain.quiz.entity.QuizResult;
import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.entity.WrongAnswer;
import com.ssafy.domain.quiz.request.QuizResultReq;
import com.ssafy.domain.quiz.request.WrongAnswerReq;
import com.ssafy.domain.quiz.response.QuizResultRes;
import com.ssafy.domain.quiz.response.WorkbookRes;
import com.ssafy.domain.quiz.response.WrongAnswerRes;
import com.ssafy.domain.quiz.service.WorkbookService;
import com.ssafy.domain.quiz.service.WrongAnswerService;
import com.ssafy.global.common.dto.Message;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quiz/wrongAnswer")
@RequiredArgsConstructor
public class WrongAnswerController {

    private final WrongAnswerService wrongAnswerService;
    private final WorkbookService workbookService;

    @PostMapping
    ResponseEntity<Message<WrongAnswerRes>> postWrongAnswer(@RequestBody WrongAnswerReq wrongAnswerReq) {
        try {
            WrongAnswer wrongAnswer = wrongAnswerService.postOne(wrongAnswerReq);
            return ResponseEntity.ok().body(Message.success(WrongAnswerRes.of(wrongAnswer), "OK", null));
        } catch (EntityNotFoundException entityNotFoundException) {
            throw entityNotFoundException;
        }
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
}
