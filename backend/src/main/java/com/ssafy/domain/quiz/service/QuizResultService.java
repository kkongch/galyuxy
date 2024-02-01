package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.entity.QuizResult;
import com.ssafy.domain.quiz.request.QuizResultReq;

public interface QuizResultService {
    public QuizResult postOne(QuizResultReq quizResultReq);
}
