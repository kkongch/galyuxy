package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.entity.Question;
import com.ssafy.domain.quiz.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    @Override
    public List<Question> findAll() {
        return questionRepository.findAllByIsDeletedIsFalse();
    }

    @Override
    public Optional<Question> findOne(Integer id) {
        return questionRepository.findQuestionByIdAndIsDeletedIsFalse(id);
    }
}
