package com.ssafy.domain.presentation.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

public class PresentationResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "presentation_result_id")
    Integer presentationResultId;

    @Column(name = "presentation_result_url")
    String presentationResultUrl;

    @Column(name = "presentation_result_create_date")
    Timestamp presentationResultCreateDate;

    @ManyToOne
    @JoinColumn(name = "presentation_id")
    Presentation presentation;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;
}
