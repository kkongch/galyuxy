package com.ssafy.domain.presentation.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

import com.ssafy.domain.classroom.entity.Group;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "presentation")
@Getter(AccessLevel.PUBLIC)
public class Presentation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "presentation_id")
    private Integer presentationId;

    @Column(name = "presentation_title")
    private String presentationTitle;

    @Column(name = "presentation_create_date")
    private Timestamp presentationCreateDate;

    @Column(name = "presentation_is_active")
    private boolean presentationIsActive;

    @Column(name = "presentation_is_deleted")
    private boolean presentationIsDeleted;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

}
