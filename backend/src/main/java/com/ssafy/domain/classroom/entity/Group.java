package com.ssafy.domain.classroom.entity;

//import com.ssafy.domain.quiz.entity.ActiveWorkbook;
import com.ssafy.domain.quiz.entity.QuizResult;
import jakarta.persistence.*;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@ToString
@Table(name = "`group`")
@Getter(AccessLevel.PUBLIC)
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    Integer id;

    @Column(name = "group_name")
    String name;

    @Column(name = "group_is_deleted")
    boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    Teacher teacher;

    @OneToMany(mappedBy = "group")
    List<Student> students = new ArrayList<Student>();

    @OneToMany(mappedBy = "group")
    List<QuizResult> quizResults = new ArrayList<QuizResult>();

//    @OneToOne
//    @JoinColumn(name = "active_workbook_id")
//    ActiveWorkbook activeWorkbook;

    public Group(String groupName, Teacher teacher) {
        this.name = groupName;
        this.teacher = teacher;
    }

}
