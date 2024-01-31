package com.ssafy.domain.quiz.request;

import jakarta.persistence.Column;
import lombok.Getter;

@Getter
public class QuestionReq {

    Integer workbookId;
    int questionType; // OX : 1 & 객관식 : 2
    String questionInstruction;
    String questionChoice1;
    String questionChoice2;
    String questionChoice3;
    String questionChoice4;
    int questionAnswer;
}
