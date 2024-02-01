package com.ssafy.domain.quiz.service;

import com.ssafy.domain.classroom.repository.TeacherRepository;
import com.ssafy.domain.quiz.entity.Question;
import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.repository.QuestionRepository;
import com.ssafy.domain.quiz.repository.WorkbookRepository;
import com.ssafy.domain.quiz.request.QuestionReq;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final TeacherRepository teacherRepository;
    private final WorkbookRepository workbookRepository;
    private final QuestionRepository questionRepository;

    @Override
    public Question postOne(QuestionReq questionReq) {

        Integer workbookId = questionReq.getWorkbookId();
        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Workbook %d Not Found", workbookId)));

        Question question = Question.builder()
                .type(questionReq.getQuestionType())
                .instruction(questionReq.getQuestionInstruction())
                .choice1(questionReq.getQuestionChoice1())
                .choice2(questionReq.getQuestionChoice2())
                .choice3(questionReq.getQuestionChoice3())
                .choice4(questionReq.getQuestionChoice4())
                .answer(questionReq.getQuestionAnswer())
                .workbook(workbook)
                .build();
        return questionRepository.save(question);
    }

    @Override
    public Optional<Question> findOne(Integer id) {
        return questionRepository.findQuestionByIdAndIsDeletedIsFalse(id);
    }

    @Override
    public void deleteOne(Integer id) {
        questionRepository.findById(id).ifPresent(question -> {
            question.softDelete();
            questionRepository.save(question);
        });
    }

    @Override
    public List<Question> findAll() {
        return questionRepository.findAllByIsDeletedIsFalse();
    }

    @Override
    public List<Question> findAllByKeyword(String keyword) {
        return questionRepository.findAllByIsDeletedIsFalseAndInstructionContaining(keyword);
    }

    @Override
    public List<Question> findAllByWorkbookId(Integer workbookId) {
        if(!teacherRepository.existsById(workbookId)) throw new EntityNotFoundException(String.format("Workbook %d Not Found", workbookId));
        return questionRepository.findAllByWorkbookId(workbookId);
    }

    @Override
    public List<Question> findAllByTeacherName(String teacherName) {
        return questionRepository.findAllByTeacherName(teacherName);
    }
}
