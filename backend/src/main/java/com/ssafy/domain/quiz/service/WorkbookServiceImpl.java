package com.ssafy.domain.quiz.service;

import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.repository.TeacherRepository;
import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.repository.WorkbookRepository;
import com.ssafy.domain.quiz.request.WorkbookReq;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkbookServiceImpl implements WorkbookService {

    private final TeacherRepository teacherRepository;
    private final WorkbookRepository workbookRepository;

    @Override
    public Workbook saveOne(WorkbookReq workbookReq) {

        Integer teacherId = workbookReq.getTeacherId();
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Teacher %d Not Found", teacherId)));

        Workbook workbook = Workbook.builder()
                .teacher(teacher)
                .title(workbookReq.getWorkbookTitle())
                .totalPoint(workbookReq.getWorkbookTotalPoint())
                .build();
        return workbookRepository.save(workbook);
    }

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
    public void deleteOne(Integer id) {
        workbookRepository.findById(id).ifPresent(workbook -> {
                    workbook.softDelete();
                    workbookRepository.save(workbook);
                });
    }
}
