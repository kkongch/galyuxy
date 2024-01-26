package com.ssafy.domain.classroom.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "teacher")
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    Integer teacherId;

    @Column(name = "teacher_name")
    String teacherName;

    @Column(name = "teacher_email")
    String teacherEmail;

    @Column(name = "teacher_password")
    String teacherPassword;

    @Column(name = "teacher_is_deleted")
    boolean teacherIsDeleted;

    @OneToMany(mappedBy = "teacher")
    List<Group> teams = new ArrayList<Group>();
}
