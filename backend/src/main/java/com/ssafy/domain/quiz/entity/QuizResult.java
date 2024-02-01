package com.ssafy.domain.quiz.entity;

import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.entity.Student;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "quiz_result")
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_result_id")
    Integer id;

    @Column(name = "quiz_result_score")
    int score;

    @ManyToOne
    @JoinColumn(name = "workbook_id")
    Workbook workbook;

    @ManyToOne
    @JoinColumn(name = "group_id")
    Group group;

    @ManyToOne
    @JoinColumn(name = "student_id")
    Student student;

    @Builder
    public QuizResult(int score, Workbook workbook, Group group, Student student) {
        this.score = score;
        this.workbook = workbook;
        this.group = group;
        this.student = student;
    }
}
