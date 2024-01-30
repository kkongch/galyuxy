package com.ssafy.domain.heritage.repository;

import com.ssafy.domain.heritage.entity.ArtworkResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtworkResultRepository extends JpaRepository<ArtworkResult, Integer> {

    List<ArtworkResult> findByStudent(int studentId);
    List<ArtworkResult> findByStudentGroup(int studentId);


    /*    List<ArtworkResult> getArtworkResultByGroupId(int groupId);
    List<ArtworkResult> getArtworkResultByStudentId(int studentId);
*/
}
