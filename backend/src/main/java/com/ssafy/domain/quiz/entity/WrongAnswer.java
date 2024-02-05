package com.ssafy.domain.quiz.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "wrong_answer")
public class WrongAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wrong_answer_id")
    Integer id;

    @Column(name = "wrong_answer_choice")
    int choice;

    @ManyToOne
    @JoinColumn(name = "quiz_result_id")
    QuizResult quizResult;

    @ManyToOne
    @JoinColumn(name = "question_id")
    Question question;

    @Builder
    public WrongAnswer(int choice, QuizResult quizResult, Question question) {
        this.choice = choice;
        this.quizResult = quizResult;
        this.question = question;
    }
}
