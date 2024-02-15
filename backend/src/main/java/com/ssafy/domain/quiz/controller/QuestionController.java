package com.ssafy.domain.quiz.controller;

import com.ssafy.domain.quiz.request.QuestionReq;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.ssafy.domain.quiz.service.QuestionService;

import org.springframework.http.ResponseEntity;
import com.ssafy.global.common.dto.Message;
import com.ssafy.domain.quiz.response.QuestionRes;
import com.ssafy.domain.quiz.entity.Question;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/quiz/question")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    ResponseEntity<Message<QuestionRes>> postQuestion(@RequestBody QuestionReq questionReq) {
        try {
            Question question = questionService.postOne(questionReq);
            return ResponseEntity.ok().body(Message.success(QuestionRes.of(question), "OK", null));
        } catch (EntityNotFoundException entityNotFoundException) {
            throw entityNotFoundException;
        }
    }

    @GetMapping("/{id}")
    ResponseEntity<Message<QuestionRes>> getQuestion(@PathVariable("id") Integer id) {
        Optional<Question> optionalQuestion = questionService.findOne(id);
        return optionalQuestion
                .map(question -> ResponseEntity.ok().body(Message.success(QuestionRes.of(question), "OK", null)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Message.fail("NOT_FOUND", null)));
    }

    @GetMapping
    ResponseEntity<Message<List<QuestionRes>>> getQuestionList() {
        List<Question> questionList = questionService.findAll();
        List<QuestionRes> questionResList = questionList.stream()
                .map(QuestionRes::of)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(Message.success(questionResList, "OK", null));
    }

    @GetMapping("/search")
    ResponseEntity<Message<List<QuestionRes>>> searchQuestionList(@RequestParam(name="keyword", required=false) String keyword, @RequestParam(name="teacherName", required=false) String teacherName) {
        List<Question> questionList = null;
        if (keyword != null) {
            questionList = questionService.findAllByKeyword(keyword);
        } else if (teacherName != null) {
            questionList = questionService.findAllByTeacherName(teacherName);
        }
        List<QuestionRes> questionResList = questionList.stream()
                .map(QuestionRes::of)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(Message.success(questionResList, "OK", null));
    }

    @PutMapping("/{id}")
    ResponseEntity<Message<Void>> deleteQuestion(@PathVariable("id") Integer id) {
        questionService.deleteOne(id);
        return ResponseEntity.ok().body(Message.success(null, "OK", null));
    }
}
