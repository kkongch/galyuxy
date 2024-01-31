package com.ssafy.domain.classroom.entity;

import jakarta.persistence.*;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
@Entity
@Table(name = "teacher")
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    Long id;

    @Column(name = "teacher_name")
    String name;

    @Column(name = "teacher_email")
    String email;

    @Column(name = "teacher_password")
    String password;

    @Column(name = "teacher_is_deleted")
    boolean isDeleted;

    @OneToMany(mappedBy = "teacher")
    List<Group> groups = new ArrayList<Group>();

    public Teacher(String teacherName, String teacherEmail, String teacherPassword) {
        this.name = teacherName;
        this.email = teacherEmail;
        this.password = teacherPassword;
    }
}
