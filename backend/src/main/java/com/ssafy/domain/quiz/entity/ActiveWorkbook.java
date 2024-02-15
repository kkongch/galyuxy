//package com.ssafy.domain.quiz.entity;
//
//import com.ssafy.domain.classroom.entity.Group;
//import jakarta.persistence.*;
//import lombok.*;
//
//import java.sql.Timestamp;
//
//@NoArgsConstructor
//@Setter
//@Getter
//@ToString
//@Entity
//@Table(name = "active_workbook")
//public class ActiveWorkbook {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "active_workbook_id")
//    Integer id;
//
//    @Column(name = "active_workbook_start")
//    Timestamp start;
//
//    @Column(name = "active_workbook_end")
//    Timestamp end;
//
//    @OneToOne
//    @JoinColumn(name = "group_id")
//    Group group;
//
//    @OneToOne
//    @JoinColumn(name = "workbook_id")
//    Workbook workbook;
//
//    @Builder
//    public ActiveWorkbook(Integer id, Timestamp start, Timestamp end, Group group, Workbook workbook) {
//        this.id = id;
//        this.start = start;
//        this.end = end;
//        this.group = group;
//        this.workbook = workbook;
//    }
//}

package com.ssafy.domain.quiz.entity;

import com.ssafy.domain.classroom.entity.Group;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Table(name = "active_workbook")
public class ActiveWorkbook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "active_workbook_id")
    Integer id;

    @Column(name = "active_workbook_start")
    Timestamp start;

    @Column(name = "active_workbook_end")
    Timestamp end;

    @Column(name = "group_id")
    Integer groupId;

    @Column(name = "workbook_id")
    Integer workbookId;
}
