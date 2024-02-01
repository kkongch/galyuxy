package com.ssafy.domain.classroom.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "student")
@Setter
@Getter
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Integer studentId;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "student_no")
    private int studentNo;

    @Column(name = "student_is_deleted")
    private boolean studentIsDeleted;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;
}
