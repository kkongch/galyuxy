package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.entity.Question;
import com.ssafy.domain.quiz.request.QuestionReq;

import java.util.List;
import java.util.Optional;

public interface QuestionService {
    Question postOne(QuestionReq questionReq);
    Optional<Question> findOne(Integer id);
    void deleteOne(Integer id);
    List<Question> findAll();
    List<Question> findAllByKeyword(String keyword);
    List<Question> findAllByWorkbookId(Integer workbookId);
    List<Question> findAllByTeacherName(String teacherName);
}
