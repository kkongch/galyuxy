package com.ssafy.domain.classroom.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.domain.heritage.entity.ArtworkResult;
import jakarta.persistence.*;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
    @JsonBackReference
    private Group group;

    @OneToMany(mappedBy = "student")
    @JsonBackReference
    private List<ArtworkResult> artworkResults;

    public Student(int no, String name ){
        this.studentNo = id;
        this.studentName = name;
        this.studentIsDeleted = false;    

    public Student(String name, int no, Group group) {
        this.name = name;
        this.no = no;
        this.group = group;
    }
}
