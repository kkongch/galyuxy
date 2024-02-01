package com.ssafy.domain.classroom.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Integer id;

    @Column(name = "student_name")
    private String name;

    @Column(name = "student_no")
    private int no;

    @Column(name = "student_is_deleted")
    private boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    public Student(String name, int no, Group group) {
        this.name = name;
        this.no = no;
        this.group = group;
    }
}
