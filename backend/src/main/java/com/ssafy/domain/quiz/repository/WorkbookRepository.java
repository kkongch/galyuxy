package com.ssafy.domain.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.domain.quiz.entity.Workbook;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WorkbookRepository extends JpaRepository<Workbook, Integer> {

    List<Workbook> findAllByIsDeletedIsFalse();

    @Query("SELECT workbook FROM Workbook workbook WHERE workbook.teacher.id = :teacherId and workbook.isDeleted = false")
    List<Workbook> findAllByTeacherId(@Param("teacherId") Integer id);

    List<Workbook> findAllByTitleContainingAndIsDeletedIsFalse(String keyword);

    @Query("SELECT workbook FROM Workbook workbook WHERE workbook.teacher.name LIKE %:teacherName% and workbook.isDeleted = false")
    List<Workbook> findAllByTeacherName(@Param("teacherName") String teacherName);
}
