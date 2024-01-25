package com.ssafy.domain.presentation.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

import com.ssafy.domain.classroom.entity.Group;

@Entity
@Table(name = "presentation")
public class Presentation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "presentation_id")
    Integer presentationId;

    @Column(name = "presentation_title")
    String presentationTitle;

    @Column(name = "presentation_create_date")
    Timestamp presentationCreateDate;

    @Column(name = "presentation_is_active")
    boolean presentationIsActive;

    @Column(name = "presentation_is_deleted")
    boolean presentationIsDeleted;

    @ManyToOne
    @JoinColumn(name = "group_id")
    Group group;
}
