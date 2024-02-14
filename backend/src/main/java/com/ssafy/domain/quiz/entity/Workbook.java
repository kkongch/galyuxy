package com.ssafy.domain.quiz.entity;

import com.ssafy.domain.classroom.entity.Teacher;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "workbook")
public class Workbook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workbook_id")
    Integer id;

    @Column(name = "workbook_title")
    String title;

    @Column(name = "workbook_total_point")
    int totalPoint;

    @Column(name = "workbook_create_date")
    Timestamp createDate;

    @Column(name = "workbook_update_date")
    Timestamp updateDate;

    @Column(name = "workbook_is_deleted")
    boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    Teacher teacher;

    @OneToMany(mappedBy = "workbook")
    List<Question> questions = new ArrayList<Question>();

//    @OneToOne
//    @JoinColumn(name = "active_workbook_id")
//    ActiveWorkbook activeWorkbook;

    @Builder
    public Workbook(String title, int totalPoint, Teacher teacher) {
        this.title = title;
        this.totalPoint = totalPoint;
        this.createDate = new Timestamp(System.currentTimeMillis());
        this.updateDate = new Timestamp(System.currentTimeMillis());
        this.teacher = teacher;
    }

    public Workbook(String title, int totalPoint, Timestamp createDate, Timestamp updateDate, Teacher teacher) {
        this.title = title;
        this.totalPoint = totalPoint;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.teacher = teacher;
    }

    public Workbook(String title, int totalPoint, Timestamp createDate, Timestamp updateDate, boolean isDeleted, Teacher teacher) {
        this.title = title;
        this.totalPoint = totalPoint;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.isDeleted = isDeleted;
        this.teacher = teacher;
    }

    public void softDelete() {
        this.isDeleted = true;
        this.updateDate = new Timestamp(System.currentTimeMillis());
    }
}
