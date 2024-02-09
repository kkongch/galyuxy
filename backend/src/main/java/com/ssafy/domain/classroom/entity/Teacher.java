package com.ssafy.domain.classroom.entity;

import com.ssafy.domain.classroom.entity.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
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
    Integer id;

    @Column(name = "teacher_name")
    String name;

    @Column(name = "teacher_email")
    @Email
    String email;

    @Column(name = "teacher_password")
    String password;

    @Column(name = "teacher_is_deleted")
    boolean isDeleted;

    @Enumerated(EnumType.STRING)
    @Column(name = "teacher_role")
    Role role;

    @OneToMany(mappedBy = "teacher")
    List<Group> groups = new ArrayList<Group>();

    @Builder
    public Teacher(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = Role.TEACHER;
    }
}