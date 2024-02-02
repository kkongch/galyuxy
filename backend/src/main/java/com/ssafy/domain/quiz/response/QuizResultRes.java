package com.ssafy.domain.quiz.response;

import com.ssafy.domain.quiz.entity.QuizResult;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizResultRes {

    Integer workbookId;
    Integer groupId;
    Integer studentId;
    int quizResultScore;

    public static QuizResultRes of(QuizResult quizResult) {
        QuizResultRes quizResultRes = new QuizResultRes();
        quizResultRes.setWorkbookId(quizResult.getWorkbook().getId());
        quizResultRes.setGroupId(quizResult.getGroup().getId());
        quizResultRes.setStudentId(quizResult.getStudent().getId());
        quizResultRes.setQuizResultScore(quizResult.getScore());
        return quizResultRes;
    }
}
