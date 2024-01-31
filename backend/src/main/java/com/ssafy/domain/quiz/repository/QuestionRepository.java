package com.ssafy.domain.quiz.repository;

import com.ssafy.domain.quiz.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    Optional<Question> findQuestionByIdAndIsDeletedIsFalse(Integer id);
    List<Question> findAllByIsDeletedIsFalse();
    List<Question> findAllByIsDeletedIsFalseAndInstructionContaining(String keyword);

    @Query("SELECT question FROM Question question WHERE question.workbook.id = :workbookId and question.isDeleted = false")
    List<Question> findAllByWorkbookId(@Param("workbookId") Integer workbookId);
}
