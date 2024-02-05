package com.ssafy.domain.classroom.repository;

import com.ssafy.domain.classroom.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    Optional<Group> findById(Integer groupId);

    @Query("SELECT CASE WHEN COUNT(student) > 0 THEN true ELSE false END FROM Group group JOIN group.students student WHERE group.id = :groupId AND student.id = :studentId")
    boolean hasStudentByStudentId(@Param("groupId") Integer groupId, @Param("studentId") Integer studentId);

    @Query("SELECT g FROM Group g WHERE g.teacher.id = :id AND g.isDeleted = false")
    List<Group> findByTeacherIdAndIsDeletedFalse(int id);
}
