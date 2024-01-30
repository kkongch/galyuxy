package com.ssafy.domain.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.domain.quiz.entity.Question;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    List<Question> findAllByIsDeletedIsFalse();
    Optional<Question> findQuestionByIdAndIsDeletedIsFalse(Integer id);
}
