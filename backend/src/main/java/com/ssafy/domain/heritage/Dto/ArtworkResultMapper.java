package com.ssafy.domain.heritage.Dto;

import com.ssafy.domain.heritage.entity.ArtworkResult;

import java.util.List;
import java.util.stream.Collectors;

public class ArtworkResultMapper {

    public static ArtworkResultDto toDto(ArtworkResult ar) {
        ArtworkResultDto dto = new ArtworkResultDto();

        dto.setId(ar.getArtworkResultId());
        dto.setCreateTime(ar.getArtworkResultCreateTime());
        dto.setImageUrl(ar.getArtworkResultImageUrl());

        dto.setArtworkId(ar.getArtwork().getArtworkId());

        dto.setStudentId(ar.getStudent().getId());
        dto.setStudentName(ar.getStudent().getName());

        return dto;
    }

    public static List<ArtworkResultDto> toDtoList(List<ArtworkResult> artworkResultList) {
        return artworkResultList.stream()
                .map(ArtworkResultMapper::toDto)
                .collect(Collectors.toList());
    }
}