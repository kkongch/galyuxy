package com.ssafy.domain.heritage.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Era {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "era_id")
    private Integer eraId;

    @Column(name = "era_name", columnDefinition = "TEXT")
    private String eraName;

    @Column(name = "era_country", columnDefinition = "TEXT")
    private String eraCountry;

    public Era(String eraName, String eraCountry){
        this.eraName = eraName;
        this.eraCountry = eraCountry;
    }
}
