package com.ssafy.domain.presentation.entity;

import com.ssafy.domain.classroom.entity.Student;
import jakarta.persistence.*;
import lombok.Setter;

@Entity
@Table(name = "student_room")
@Setter
public class StudentRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_room_id")
    private Integer studentRoomId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}
