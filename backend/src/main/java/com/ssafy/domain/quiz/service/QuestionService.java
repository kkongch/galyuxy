package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.entity.Question;

import java.util.List;
import java.util.Optional;

public interface QuestionService {
    List<Question> findAll();
    Optional<Question> findOne(Integer id);
}
