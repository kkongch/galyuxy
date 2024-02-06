package com.ssafy.domain.presentation.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.sql.Timestamp;

import com.ssafy.domain.classroom.entity.Group;
import lombok.*;

@Entity
@Table(name = "presentation")
@Getter(AccessLevel.PUBLIC)
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Presentation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "presentation_id")
    private Integer presentationId;

    @Column(name = "presentation_title", unique = true)
    private String presentationTitle;

    @Column(name = "presentation_create_date")
    private Timestamp presentationCreateDate;

    @Column(name = "presentation_is_active")
    private boolean presentationIsActive;

    @Column(name = "presentation_is_deleted")
    private boolean presentationIsDeleted;

    @ManyToOne
    @JoinColumn(name = "group_id")
    @JsonBackReference
    private Group group;

    public Presentation(String presentationTitle, Group group) {
        this.presentationTitle = presentationTitle;
        this.group = group;
    }

}
