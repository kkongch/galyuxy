package com.ssafy.domain.heritage.service;

import com.ssafy.domain.heritage.Dto.ArtworkResultDto;
import com.ssafy.domain.heritage.entity.Artwork;

import java.util.List;

public interface ArtworkService {
    List<Artwork> getByType(int type);
    List<ArtworkResultDto> getResultByGroupId(int groupId);
    List<ArtworkResultDto> getResultByStudentId(int studentId);

}
