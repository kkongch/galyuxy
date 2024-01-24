package com.ssafy.domain.classroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.domain.classroom.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
}
