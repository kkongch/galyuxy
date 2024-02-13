package com.ssafy.domain.heritage.service;

import com.ssafy.domain.heritage.Dto.ArtworkDto;
import com.ssafy.domain.heritage.Dto.ArtworkResultDto;
import com.ssafy.domain.heritage.entity.Artwork;

import java.util.List;

public interface ArtworkService {

    List<ArtworkDto> getAll();

    List<Artwork> getByType(int type);

    ArtworkDto getById(int id);
    List<ArtworkResultDto> getResultByGroupId(int groupId);
    List<ArtworkResultDto> getResultByStudentId(int studentId);

    void saveResult(int type, int studentId, String imageUrl  );

}
