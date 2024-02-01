package com.ssafy.domain.quiz.service;

import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.entity.Student;
import com.ssafy.domain.classroom.repository.GroupRepository;
import com.ssafy.domain.classroom.repository.StudentRepository;
import com.ssafy.domain.quiz.entity.Question;
import com.ssafy.domain.quiz.entity.QuizResult;
import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.repository.QuizResultRepository;
import com.ssafy.domain.quiz.repository.WorkbookRepository;
import com.ssafy.domain.quiz.request.QuestionReq;
import com.ssafy.domain.quiz.request.QuizResultReq;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizResultServiceImpl implements QuizResultService{

    private final WorkbookRepository workbookRepository;
    private final GroupRepository groupRepository;
    private final StudentRepository studentRepository;
    private final QuizResultRepository quizResultRepository;

    @Override
    public QuizResult postOne(QuizResultReq quizResultReq) {

        Integer workbookId = quizResultReq.getWorkbookId();
        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Workbook %d Not Found", workbookId)));

        Integer groupId = quizResultReq.getGroupId();
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Group %d Not Found", groupId)));


        Integer studentId = quizResultReq.getStudentId();

        boolean groupHasStudent = groupRepository.hasStudentByStudentId(groupId, studentId);
        if (!groupHasStudent) throw new EntityNotFoundException(String.format("Group %d doesn't has Student %d", groupId, studentId));

        Student student = studentRepository.findById(studentId).get();

        QuizResult quizResult = QuizResult.builder()
                .workbook(workbook)
                .group(group)
                .student(student)
                .score(quizResultReq.getQuizResultScore())
                .build();
        return quizResultRepository.save(quizResult);
    }
}
