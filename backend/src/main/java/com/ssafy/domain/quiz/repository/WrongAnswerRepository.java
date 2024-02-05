package com.ssafy.domain.quiz.repository;

import com.ssafy.domain.quiz.entity.WrongAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WrongAnswerRepository extends JpaRepository<WrongAnswer, Integer> {
}
