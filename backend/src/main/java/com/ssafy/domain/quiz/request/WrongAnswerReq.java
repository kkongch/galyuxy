package com.ssafy.domain.quiz.request;

import lombok.Getter;

@Getter
public class WrongAnswerReq {
    Integer quizResultId;
    Integer questionId;
    int wrongAnswerChoice;
}
