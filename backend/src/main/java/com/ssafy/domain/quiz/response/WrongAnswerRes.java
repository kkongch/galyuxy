package com.ssafy.domain.quiz.response;

import com.ssafy.domain.quiz.entity.WrongAnswer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WrongAnswerRes {

    Integer wrongAnswerId;
    int wrongAnswerChoice;

    public static WrongAnswerRes of(WrongAnswer wrongAnswer) {
        WrongAnswerRes wrongAnswerRes = new WrongAnswerRes();
        wrongAnswerRes.setWrongAnswerId(wrongAnswer.getId());
        wrongAnswerRes.setWrongAnswerChoice(wrongAnswer.getChoice());
        return wrongAnswerRes;
    }
}
