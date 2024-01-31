package com.ssafy.domain.quiz.response;

import com.ssafy.domain.quiz.entity.Question;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionRes {

    Integer workbookId;
    int questionType;
    String questionInstruction;
    String questionChoice1;
    String questionChoice2;
    String questionChoice3;
    String questionChoice4;
    int questionAnswer;

    public static QuestionRes of(Question question) {
        QuestionRes questionRes = new QuestionRes();
        questionRes.setWorkbookId(question.getWorkbook().getId());
        questionRes.setQuestionType(question.getType());
        questionRes.setQuestionInstruction(question.getInstruction());
        questionRes.setQuestionChoice1(question.getChoice1());
        questionRes.setQuestionChoice2(question.getChoice2());
        questionRes.setQuestionChoice3(question.getChoice3());
        questionRes.setQuestionChoice4(question.getChoice4());
        questionRes.setQuestionAnswer(question.getAnswer());
        return questionRes;
    }
}
