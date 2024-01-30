package com.ssafy.domain.classroom.entity;

import jakarta.persistence.*;

import lombok.AccessLevel;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "`group`")
@Getter(AccessLevel.PUBLIC)
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    Integer groupId;

    @Column(name = "group_name")
    String groupName;

    @Column(name = "group_is_deleted")
    boolean groupIsDeleted;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    Teacher teacher;

    @OneToMany(mappedBy = "group")
    List<Student> students = new ArrayList<Student>();

    public Group(String groupName, Teacher teacher) {
        this.groupName = groupName;
        this.teacher = teacher;
    }

    public Group() {

    }
}
