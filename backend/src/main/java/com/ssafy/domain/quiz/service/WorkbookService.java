package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.entity.Workbook;

import java.util.List;
import java.util.Optional;

public interface WorkbookService {
    List<Workbook> findAll();
    List<Workbook> findAllByTeacherId(Integer id);
    List<Workbook> findAllByKeyword(String keyword);
    List<Workbook> findAllByTeacherName(String teacherName);
}
