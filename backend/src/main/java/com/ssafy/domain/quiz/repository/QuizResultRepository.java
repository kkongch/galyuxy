package com.ssafy.domain.quiz.repository;

import com.ssafy.domain.quiz.entity.QuizResult;
import com.ssafy.domain.quiz.response.StudentQuizResultRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Integer> {
    @Query("SELECT s.no AS studentNo, s.name AS studentName, qr.score AS quizResultScore " +
            "FROM QuizResult qr " +
            "JOIN qr.student s " +
            "JOIN qr.workbook w " +
            "JOIN qr.group g " +
            "WHERE w.id = :workbookId AND g.id = :groupId")
    List<StudentQuizResultProjection> findAllByWorkbookIdAndGroupId(@Param("workbookId") Integer workbookId, @Param("groupId") Integer groupId);
}

