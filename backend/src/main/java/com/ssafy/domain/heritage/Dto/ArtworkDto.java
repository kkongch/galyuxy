package com.ssafy.domain.heritage.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArtworkDto {
    private int id;
    private int type;
    private String imageUrl;


    private int eraId;
    private String eraName;
    private String eraCountry;

    private int heritageId;
    private String heritageName;
}
