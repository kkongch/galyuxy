package com.ssafy.domain.quiz.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    Long questionId;

    @ManyToOne
    @JoinColumn(name = "workbook_id")
    Workbook workbook;
}
