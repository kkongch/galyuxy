package com.ssafy.domain.quiz.request;

import lombok.Getter;

@Getter
public class QuizResultReq {

    Integer workbookId;
    Integer groupId;
    Integer studentId;
    int quizResultScore;
}
