package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.entity.QuizResult;
import com.ssafy.domain.quiz.request.QuizResultReq;
import com.ssafy.domain.quiz.response.StudentQuizResultRes;

import java.util.List;

public interface QuizResultService {
    public QuizResult postOne(QuizResultReq quizResultReq);

    List<StudentQuizResultRes> getAllByWorkbookIdAndGroupId(Integer workbookId, Integer groupId);
}
