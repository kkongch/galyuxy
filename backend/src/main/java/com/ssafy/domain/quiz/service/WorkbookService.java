package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.request.WorkbookReq;

import java.util.List;

public interface WorkbookService {
    Workbook saveOne(WorkbookReq workbookReq);
    void deleteOne(Integer id);
    List<Workbook> findAll();
    List<Workbook> findAllByTeacherId(Integer id);
    List<Workbook> findAllByKeyword(String keyword);
    List<Workbook> findAllByTeacherName(String teacherName);
}
