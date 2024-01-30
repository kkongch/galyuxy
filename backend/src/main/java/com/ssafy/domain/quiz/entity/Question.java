package com.ssafy.domain.quiz.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    Integer id;

    @Column(name = "question_type")
    int type;

    @Column(name = "question_instrction")
    String instruction;

    @Column(name = "question_choice1")
    String choice1;

    @Column(name = "question_choice2")
    String choice2;

    @Column(name = "question_choice3")
    String choice3;

    @Column(name = "question_choice4")
    String choice4;

    @Column(name = "question_answer")
    int answer;

    @Column(name = "quesion_is_deleted")
    boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "workbook_id")
    Workbook workbook;
}
