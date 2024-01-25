package com.ssafy.domain.presentation.entity;

import com.ssafy.domain.classroom.entity.Student;
import jakarta.persistence.*;

@Entity
@Table(name = "student_room")
public class StudentRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_room_id")
    Integer studentRoomId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    @ManyToOne
    @JoinColumn(name = "student_id")
    Student student;

    @OneToOne
    @JoinColumn(name = "ar_filter_id")
    ARFilter arFilter;
}
