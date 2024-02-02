package com.ssafy.domain.quiz.response;

import com.ssafy.domain.quiz.entity.QuizResult;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentQuizResultRes {

    int studentNo;
    String studentName;
    int quizResultScore;

    public StudentQuizResultRes(int studentNo, String studentName, int quizResultScore) {
        this.studentNo = studentNo;
        this.studentName = studentName;
        this.quizResultScore = quizResultScore;
    }
}
