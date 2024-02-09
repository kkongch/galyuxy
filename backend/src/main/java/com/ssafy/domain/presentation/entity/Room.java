package com.ssafy.domain.presentation.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "room")
@Getter(AccessLevel.PUBLIC)
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    @Id
    @Column(name = "room_id", length = 50, nullable = false)
    private String roomId;

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
