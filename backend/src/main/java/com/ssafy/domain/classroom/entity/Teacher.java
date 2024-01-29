package com.ssafy.domain.classroom.entity;

import jakarta.persistence.*;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
@Entity
@Table(name = "teacher")
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    Long teacherId;

    @Column(name = "teacher_name")
    String teacherName;

    @Column(name = "teacher_email")
    String teacherEmail;

    @Column(name = "teacher_password")
    String teacherPassword;

    @Column(name = "teacher_is_deleted")
    boolean teacherIsDeleted;

    @OneToMany(mappedBy = "teacher")
    List<Group> groups = new ArrayList<Group>();

    public Teacher(String teacherName, String teacherEmail, String teacherPassword) {
        this.teacherName = teacherName;
        this.teacherEmail = teacherEmail;
        this.teacherPassword = teacherPassword;
    }
}
