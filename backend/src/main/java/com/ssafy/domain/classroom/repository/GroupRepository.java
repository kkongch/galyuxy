package com.ssafy.domain.classroom.repository;

import com.ssafy.domain.classroom.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    Optional<Group> findByGroupId(int groupId);
}
