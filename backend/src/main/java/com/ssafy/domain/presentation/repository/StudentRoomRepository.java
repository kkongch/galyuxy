package com.ssafy.domain.presentation.repository;

import com.ssafy.domain.presentation.entity.StudentRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRoomRepository extends JpaRepository<StudentRoom, Integer> {

}
