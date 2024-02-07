package com.ssafy.domain.classroom.repository;

import com.ssafy.domain.classroom.dto.TeacherDto;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.domain.classroom.entity.Teacher;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
    Optional<Teacher> findByEmail(String email);
    int countByEmail(String email);
}
