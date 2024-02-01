package com.ssafy.domain.classroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.domain.classroom.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}
