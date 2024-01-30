package com.ssafy.domain.heritage.service;

import com.ssafy.domain.heritage.entity.Artwork;
import com.ssafy.domain.heritage.entity.ArtworkResult;
import com.ssafy.domain.heritage.repository.ArtworkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArtworkServiceImpl implements ArtworkService{

    @Autowired
    private final ArtworkRepository artworkRepository;


    @Override
    public List<Artwork> getArtworkByType(int type) {
        return artworkRepository.findByArtworkType(type);
    }

    @Override
    public List<ArtworkResult> getArtworkResultByGroupId(int groupId) {
        return null;
    }

    @Override
    public List<ArtworkResult> getArtworkResultByStudentId(int studentId) {
        return null;
    }
}
