package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.entity.WrongAnswer;
import com.ssafy.domain.quiz.request.WrongAnswerReq;

public interface WrongAnswerService {
    WrongAnswer postOne(WrongAnswerReq wrongAnswerReq);
}
