package com.ssafy.domain.classroom.entity;

import jakarta.persistence.*;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "`group`")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    Integer groupId;

    @Column(name = "group_name")
    String teamName;

    @Column(name = "group_is_deleted")
    boolean teamIsDeleted;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    Teacher teacher;

    @OneToMany(mappedBy = "group")
    List<Student> students = new ArrayList<Student>();
}
