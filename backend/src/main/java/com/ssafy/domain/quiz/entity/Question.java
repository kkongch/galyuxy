package com.ssafy.domain.quiz.entity;

import com.ssafy.domain.classroom.entity.Teacher;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    Integer id;

    // OX : 1 & 객관식 : 2
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

    @Column(name = "question_is_deleted")
    boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "workbook_id")
    Workbook workbook;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    Teacher teacher;

    @Builder
    public Question(int type, String instruction, String choice1, String choice2, String choice3, String choice4, int answer, Workbook workbook, Teacher teacher) {
        this.type = type;
        this.instruction = instruction;
        this.choice1 = choice1;
        this.choice2 = choice2;
        this.choice3 = choice3;
        this.choice4 = choice4;
        this.answer = answer;
        this.workbook = workbook;
        this.teacher = teacher;
    }

    public Question(int type, String instruction, String choice1, String choice2, String choice3, String choice4, int answer, boolean isDeleted, Workbook workbook, Teacher teacher) {
        this.type = type;
        this.instruction = instruction;
        this.choice1 = choice1;
        this.choice2 = choice2;
        this.choice3 = choice3;
        this.choice4 = choice4;
        this.answer = answer;
        this.isDeleted = isDeleted;
        this.workbook = workbook;
        this.teacher = teacher;
    }

    public void softDelete() {
        this.isDeleted = true;
    }
}
