package com.ssafy.domain.heritage.Dto;
import com.ssafy.domain.heritage.entity.Artwork;

import java.util.List;
import java.util.stream.Collectors;
public class ArtworkMapper {
    public static ArtworkDto toDto(Artwork aw){
        ArtworkDto dto = new ArtworkDto();
        dto.setId(aw.getArtworkId());
        dto.setType(aw.getArtworkType());
        dto.setImageUrl(aw.getArtworkImageUrl());

        dto.setEraId(aw.getEra().getEraId());
        dto.setEraName(aw.getEra().getEraName());
        dto.setEraCountry(aw.getEra().getEraCountry());

        dto.setHeritageId(aw.getHeritage().getHeritageId());
        dto.setHeritageName(aw.getHeritage().getHeritageName());
        return dto;
    }

    public static List<ArtworkDto> toDtoList(List<Artwork> artworkList){
        return artworkList.stream().map(ArtworkMapper::toDto)
                .collect(Collectors.toList());
    }
}