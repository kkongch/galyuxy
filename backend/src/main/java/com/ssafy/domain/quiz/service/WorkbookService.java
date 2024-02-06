package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.request.WorkbookReq;

import java.util.List;
import java.util.Optional;

public interface WorkbookService {
    Workbook postOne(WorkbookReq workbookReq);
    void deleteOne(Integer id);
    public Optional<Workbook> findOne(Integer id);
    List<Workbook> getAll();
    List<Workbook> getAllByTeacherId(Integer id);
    List<Workbook> getAllByKeyword(String keyword);
    List<Workbook> getAllByTeacherName(String teacherName);
}
