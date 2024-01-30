package com.ssafy.domain.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.domain.quiz.entity.Workbook;

import java.util.List;

public interface WorkbookRepository extends JpaRepository<Workbook, Long> {

    List<Workbook> findAllByIsDeletedIsFalse();
//    List<Workbook> findAllByTeacher();
    List<Workbook> findAllByTitleLike(String keyword);
}
