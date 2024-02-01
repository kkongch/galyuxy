package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.entity.QuizResult;
import com.ssafy.domain.quiz.request.QuizResultReq;

import java.util.List;

public interface QuizResultService {
    public QuizResult postOne(QuizResultReq quizResultReq);

    List<QuizResult> getAllByWorkbookIdAndGroupId(Integer workbookId, Integer groupId);
}
