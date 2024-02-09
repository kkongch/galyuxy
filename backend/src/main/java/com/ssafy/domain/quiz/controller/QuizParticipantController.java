package com.ssafy.domain.quiz.controller;

import com.ssafy.domain.quiz.request.QuizParticipant;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class QuizParticipantController {

    @MessageMapping("/quiz/student/participant")
    @SendTo("/quiz/teacher/participation")
    public QuizParticipant notify(QuizParticipant quizParticipant) throws Exception {
        System.out.println(quizParticipant.toString());
        return quizParticipant;
    }
}
