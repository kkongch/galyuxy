package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.repository.WorkbookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkbookServiceImpl implements WorkbookService {

    private final WorkbookRepository workbookRepository;

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
}
