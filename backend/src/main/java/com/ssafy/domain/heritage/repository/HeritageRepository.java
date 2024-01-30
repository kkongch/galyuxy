package com.ssafy.domain.heritage.repository;

import com.ssafy.domain.heritage.entity.Heritage;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface HeritageRepository extends JpaRepository<Heritage, Integer> {
}
