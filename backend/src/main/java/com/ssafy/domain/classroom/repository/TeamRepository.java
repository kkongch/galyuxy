package com.ssafy.domain.classroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.domain.classroom.entity.Team;

public interface TeamRepository extends JpaRepository<Team, Integer> {
}
