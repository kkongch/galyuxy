package com.ssafy.domain.classroom.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    Long studentId;

    @Column(name = "student_name")
    String studentName;

    @Column(name = "student_no")
    int studentNo;

    @Column(name = "student_is_deleted")
    boolean studentIsDeleted;

    @ManyToOne
    @JoinColumn(name = "group_id")
    Group group;
}
