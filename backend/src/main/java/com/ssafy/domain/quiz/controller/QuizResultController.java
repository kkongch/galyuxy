package com.ssafy.domain.quiz.controller;

import com.ssafy.domain.quiz.entity.Question;
import com.ssafy.domain.quiz.entity.QuizResult;
import com.ssafy.domain.quiz.request.QuestionReq;
import com.ssafy.domain.quiz.request.QuizResultReq;
import com.ssafy.domain.quiz.response.QuestionRes;
import com.ssafy.domain.quiz.response.QuizResultRes;
import com.ssafy.domain.quiz.response.StudentQuizResultRes;
import com.ssafy.domain.quiz.service.QuizResultService;
import com.ssafy.global.common.dto.Message;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quiz/quizResult")
@RequiredArgsConstructor
public class QuizResultController {

    private final QuizResultService quizResultService;

    @PostMapping
    ResponseEntity<Message<QuizResultRes>> postQuizResult(@RequestBody QuizResultReq quizResultReq) {
        try {
            QuizResult quizResult = quizResultService.postOne(quizResultReq);
            return ResponseEntity.ok().body(Message.success(QuizResultRes.of(quizResult), "OK", null));
        } catch (EntityNotFoundException entityNotFoundException) {
            throw entityNotFoundException;
        }
    }

    @GetMapping
    ResponseEntity<Message<List<StudentQuizResultRes>>> getQuizResultListByWorkbookIdAndGroupId(@RequestParam(name = "workbookId") Integer workbookId, @RequestParam(name = "groupId") Integer groupId) {
        List<StudentQuizResultRes> studentQuizResultResList = quizResultService.getAllByWorkbookIdAndGroupId(workbookId, groupId);
        return ResponseEntity.ok().body(Message.success(studentQuizResultResList, "OK", null));
    }
}
