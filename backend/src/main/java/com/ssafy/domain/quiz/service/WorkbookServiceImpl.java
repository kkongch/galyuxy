package com.ssafy.domain.quiz.service;

import com.ssafy.domain.classroom.repository.TeacherRepository;
import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.repository.WorkbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkbookServiceImpl implements WorkbookService {

    @Autowired
    private WorkbookRepository workbookRepository;

    @Override
    public List<Workbook> findAll() {
        return workbookRepository.findAllByIsDeletedIsFalse();
    }

    @Override
    public List<Workbook> findAllByTeacherId(Integer id) {
        return workbookRepository.findAllByTeacherId(id);
    }

    @Override
    public List<Workbook> findAllByKeyword(String keyword) {
        return workbookRepository.findAllByTitleContainingAndIsDeletedIsFalse(keyword);
    }

    @Override
    public List<Workbook> findAllByTeacherName(String teacherName) {
        return workbookRepository.findAllByTeacherName(teacherName);
    }

    @Override
    public void findWorkbookWithQuestions(Integer id) {

    }

}
