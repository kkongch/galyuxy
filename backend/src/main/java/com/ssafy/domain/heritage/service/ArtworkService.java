package com.ssafy.domain.heritage.service;

import com.ssafy.domain.heritage.entity.Artwork;
import com.ssafy.domain.heritage.entity.ArtworkResult;

import java.util.List;

public interface ArtworkService {
    List<Artwork> getArtworkByType(int type);
    List<ArtworkResult> getArtworkResultByGroupId(int groupId);
    List<ArtworkResult> getArtworkResultByStudentId(int studentId);

}
