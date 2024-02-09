package com.ssafy.domain.quiz.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuizParticipant {

    private int questionNo;
    private int studentNo;
    private String studentName;

    public QuizParticipant(int questionNo, int studentNo, String studentName) {
        this.questionNo = questionNo;
        this.studentNo = studentNo;
        this.studentName = studentName;
    }
}
