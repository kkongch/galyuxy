package com.ssafy.domain.quiz.response;

import com.ssafy.domain.quiz.entity.Question;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionRes {

    int type;
    String instruction;
    String choice1;
    String choice2;
    String choice3;
    String choice4;
    int answer;

    public static QuestionRes of(Question question) {
        QuestionRes questionRes = new QuestionRes();
        questionRes.setType(question.getType());
        questionRes.setInstruction(question.getInstruction());
        questionRes.setChoice1(question.getChoice1());
        questionRes.setChoice2(question.getChoice2());
        questionRes.setChoice3(question.getChoice3());
        questionRes.setChoice4(question.getChoice4());
        questionRes.setAnswer(question.getAnswer());
        return questionRes;
    }
}
