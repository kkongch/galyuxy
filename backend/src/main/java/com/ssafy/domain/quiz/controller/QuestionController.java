package com.ssafy.domain.quiz.controller;

import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.exception.TeacherException;
import com.ssafy.domain.classroom.response.TeacherRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.domain.quiz.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.http.ResponseEntity;
import com.ssafy.global.config.common.dto.Message;
import com.ssafy.domain.quiz.response.QuestionRes;
import com.ssafy.domain.quiz.entity.Question;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quiz/question")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    ResponseEntity<Message<List<QuestionRes>>> getQuestionList() {

        List<Question> questionList = questionService.findAll();
        List<QuestionRes> questionResList = questionList.stream()
                .map(QuestionRes::of)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(Message.success(questionResList, "OK", null));
    }

    @GetMapping("/{id}")
    ResponseEntity<Message<QuestionRes>> getQuestion(@PathVariable("id") Integer id) {
        Optional<Question> optionalQuestion = questionService.findOne(id);
        return optionalQuestion
                .map(question -> ResponseEntity.ok().body(Message.success(QuestionRes.of(question))))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Message.fail("NOT_FOUND", "Question Not Found")));
    }
}
