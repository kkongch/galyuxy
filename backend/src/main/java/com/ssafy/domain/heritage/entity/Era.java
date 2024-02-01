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
public class Era {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "era_id")
    private int eraId;

    @Column(name = "era_name", columnDefinition = "TEXT")
    private String eraName;

    @Column(name = "era_country", columnDefinition = "TEXT")
    private String eraCountry;

    public Era(String eraName, String eraCountry){
        this.eraName = eraName;
        this.eraCountry = eraCountry;
    }
}
