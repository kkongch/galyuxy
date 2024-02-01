package com.ssafy.domain.presentation.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "room")
@Getter(AccessLevel.PUBLIC)
@Setter
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Integer roomId;

    @Column(name = "room_subject")
    private String roomSubject;

    @Column(name = "room_script")
    private String roomScript;

    @Column(name = "room_is_deleted")
    private boolean roomIsDeleted;

    @ManyToOne
    @JoinColumn(name = "presentation_id")
    private Presentation presentation;
}
