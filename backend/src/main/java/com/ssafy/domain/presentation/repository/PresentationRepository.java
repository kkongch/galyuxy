package com.ssafy.domain.presentation.repository;

import com.ssafy.domain.presentation.entity.Presentation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PresentationRepository extends JpaRepository<Presentation, Integer> {
    List<Presentation> findByGroupIdAndPresentationIsDeletedFalse(int groupId);
    List<Presentation> findByGroupIdAndPresentationIsActiveTrue(Integer groupId);
 }
