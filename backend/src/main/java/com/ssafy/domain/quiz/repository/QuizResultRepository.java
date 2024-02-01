package com.ssafy.domain.quiz.repository;

import com.ssafy.domain.quiz.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizResultRepository extends JpaRepository<QuizResult, Integer> {
}
