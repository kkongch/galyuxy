package com.ssafy.domain.heritage.repository;

import com.ssafy.domain.heritage.entity.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtworkRepository  extends JpaRepository<Artwork, Integer> {
    List<Artwork> findByArtworkType(int type);

}
