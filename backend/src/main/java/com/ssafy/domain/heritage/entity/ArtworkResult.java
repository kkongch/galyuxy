package com.ssafy.domain.heritage.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "artwork_result")
public class ArtworkResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artwork_result_id")
    int artworkResultId;

    @Column(name = "artwork_result_create_time")
    Timestamp artworkResultCreateTime;

    @Column(name = "artwork_result_image_url")
    String artworkResultImageUrl;
}
