package com.ssafy.domain.heritage.repository;

import com.ssafy.domain.heritage.entity.ArtworkResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtworkResultRepository extends JpaRepository<ArtworkResult, Integer> {
    List<ArtworkResult> findByStudentGroupId(int studentId);
    List<ArtworkResult> findByStudentId(int studentId);


}
