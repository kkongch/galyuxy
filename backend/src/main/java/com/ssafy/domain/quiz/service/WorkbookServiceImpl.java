package com.ssafy.domain.quiz.service;

import com.ssafy.domain.classroom.repository.TeacherRepository;
import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.repository.WorkbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkbookServiceImpl implements WorkbookService {

    @Autowired
    private WorkbookRepository workbookRepository;

    @Override
    public List<Workbook> findAll() {
        return workbookRepository.findAllByIsDeletedIsFalse();

    }
}
