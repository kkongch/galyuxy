package com.ssafy.domain.heritage.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter(AccessLevel.PUBLIC)
@Setter
@NoArgsConstructor
public class Artwork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artwork_id")
    private int artworkId;

    @Column(name = "artwork_type")
    private int artworkType;

    @Column(name = "artwork_image_url")
    private String artworkImageUrl;

    @ManyToOne
    @JoinColumn(name = "era_id", nullable = false)
    private Era era;

    @ManyToOne
    @JoinColumn(name = "heritage_id", nullable = false)
    private Heritage heritage;

    public Artwork(int artworkType, String artworkImageUrl) {
        this.artworkType = artworkType;
        this.artworkImageUrl = artworkImageUrl;
    }
}
