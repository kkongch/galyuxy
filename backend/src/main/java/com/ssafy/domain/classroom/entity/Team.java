package com.ssafy.domain.classroom.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    Integer teamId;

    @Column(name = "team_name")
    String teamName;

    @Column(name = "team_is_deleted")
    boolean teamIsDeleted;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    Teacher teacher;

    @OneToMany(mappedBy = "team")
    List<Student> students = new ArrayList<Student>();
}
