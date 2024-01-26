package com.ssafy.domain.classroom.repository;

import com.ssafy.domain.classroom.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
public interface GroupRepository extends JpaRepository<Group, Integer> {
}
