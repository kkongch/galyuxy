package com.ssafy.domain.quiz.repository;

import com.ssafy.domain.quiz.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Integer> {
    @Query("SELECT quizResult, student.no FROM QuizResult quizResult " +
            "JOIN quizResult.group.students student " +
            "WHERE quizResult.workbook.id = :workbookId AND quizResult.group.id = :groupId")
    List<QuizResult> findAllByWorkbookIdAndGroupId(@Param("workbookId") Integer workbookId, @Param("groupId") Integer groupId);
//    List<Object[]> findAllByWorkbookIdAndGroupId(@Param("workbookId") Integer workbookId, @Param("groupId") Integer groupId);
}
