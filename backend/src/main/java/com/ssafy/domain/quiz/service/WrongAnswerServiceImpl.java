package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.entity.Question;
import com.ssafy.domain.quiz.entity.QuizResult;
import com.ssafy.domain.quiz.entity.WrongAnswer;
import com.ssafy.domain.quiz.repository.QuestionRepository;
import com.ssafy.domain.quiz.repository.QuizResultRepository;
import com.ssafy.domain.quiz.repository.WrongAnswerRepository;
import com.ssafy.domain.quiz.request.WrongAnswerReq;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WrongAnswerServiceImpl implements WrongAnswerService {

    private final QuestionRepository questionRepository;
    private final QuizResultRepository quizResultRepository;
    private final WrongAnswerRepository wrongAnswerRepository;

    @Override
    public WrongAnswer postOne(WrongAnswerReq wrongAnswerReq) {
        Integer quizResultId = wrongAnswerReq.getQuizResultId();
        QuizResult quizResult = quizResultRepository.findById(quizResultId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Quiz Result %d Not Found", quizResultId)));


        Integer questionId = wrongAnswerReq.getQuestionId();
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Question %d Not Found", questionId)));

        WrongAnswer wrongAnswer = WrongAnswer.builder()
                .quizResult(quizResult)
                .question(question)
                .choice(wrongAnswerReq.getWrongAnswerChoice())
                .build();

        return wrongAnswerRepository.save(wrongAnswer);
    }
}
