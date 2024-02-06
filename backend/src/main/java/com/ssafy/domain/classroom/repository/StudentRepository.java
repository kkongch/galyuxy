package com.ssafy.domain.classroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.domain.classroom.entity.Student;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Integer> {

//    @Query("SELECT s FROM Student s WHERE s.group.id = :groupId AND s.isDeleted = false")
    List<Student> findAllByGroupIdAndIsDeletedFalse(int groupId);

}
