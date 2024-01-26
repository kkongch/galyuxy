package com.ssafy.domain.presentation.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    Integer roomId;

    @Column(name = "room_subject")
    String roomSubject;

    @Column(name = "room_script")
    String roomScript;

    @Column(name = "room_is_deleted")
    boolean roomIsDeleted;

    @ManyToOne
    @JoinColumn(name = "presentation_id")
    Presentation presentation;
}
