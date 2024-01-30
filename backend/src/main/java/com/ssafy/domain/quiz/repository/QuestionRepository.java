package com.ssafy.domain.quiz.repository;

import com.ssafy.domain.quiz.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
}
