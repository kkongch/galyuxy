package com.ssafy.global.config;

import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.entity.Student;
import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.repository.GroupRepository;
import com.ssafy.domain.classroom.repository.StudentRepository;
import com.ssafy.domain.quiz.entity.Question;
import com.ssafy.domain.quiz.entity.QuizResult;
import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.repository.QuestionRepository;
import com.ssafy.domain.quiz.repository.QuizResultRepository;
import com.ssafy.domain.quiz.repository.WorkbookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ssafy.domain.classroom.repository.TeacherRepository;

import java.sql.Timestamp;

@RequiredArgsConstructor
@Configuration
public class LoadDatabase {

    private final TeacherRepository teacherRepository;
    private final GroupRepository groupRepository;
    private final StudentRepository studentRepository;
    private final WorkbookRepository workbookRepository;
    private final QuestionRepository questionRepository;
    private final QuizResultRepository quizResultRepository;

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase() {

        return args -> {

            // Teacher
            Teacher teacherKim = new Teacher("김선생", "kim@mail.com", "1111");
            log.info("Preloading " + teacherRepository.save(teacherKim));

            Teacher teacherLee = new Teacher("이선생", "lee@mail.com", "2222");
            log.info("Preloading " + teacherRepository.save(teacherLee));

            log.info("Preloading " + teacherRepository.save(new Teacher("박선생", "park@mail.com", "3333")));
            log.info("Preloading " + teacherRepository.save(new Teacher("최선생", "choi@mail.com", "4444")));

            // Group
            Group group = new Group("24년 1학기 장덕초 5학년 2반", teacherKim);
            log.info("Preloading " + groupRepository.save(group));
            Group groupB = new Group("24년 2학기 장덕초 5학년 2반", teacherKim);
            groupRepository.save(groupB);

            // Student
            Student student = new Student("김싸피", 1, group);
            studentRepository.save(student);
            studentRepository.save(new Student("이싸피", 2, group));
            Student studentPark = new Student("박싸피", 3, groupB);
            studentRepository.save(studentPark);

            // Workbook
            Workbook kimWorkbook = new Workbook("김선생 고구려 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), teacherKim);
            log.info("Preloading " + workbookRepository.save(kimWorkbook));
            log.info("Preloading " + workbookRepository.save(new Workbook("김선생 백제 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), teacherKim)));
            log.info("Preloading " + workbookRepository.save(new Workbook("김선생 신라 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), true, teacherKim)));

            Workbook leeWorkbook = new Workbook("이선생 고구려 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), teacherLee);
            log.info("Preloading " + workbookRepository.save(leeWorkbook));
            log.info("Preloading " + workbookRepository.save(new Workbook("이선생 백제 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), true, teacherLee)));
            log.info("Preloading " + workbookRepository.save(new Workbook("이선생 신라 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), true, teacherLee)));

            // Question
            questionRepository.save(new Question(1, "OX 퀴즈 질문", "", "", "", "", 1, kimWorkbook, kimWorkbook.getTeacher()));
            questionRepository.save(new Question(2, "객관식 퀴즈 질문", "선지 1번", "선지 2번", "선지 3번", "선지 4번", 2, kimWorkbook, kimWorkbook.getTeacher()));
            questionRepository.save(new Question(1, "OX 퀴즈 질문", "", "", "", "", 2, false, kimWorkbook, kimWorkbook.getTeacher()));
            questionRepository.save(new Question(2, "객관식 퀴즈 질문", "선지 1번", "선지 2번", "선지 3번", "선지 4번", 4, true, kimWorkbook, kimWorkbook.getTeacher()));

            questionRepository.save(new Question(1, "OX 퀴즈 질문", "", "", "", "", 1, leeWorkbook, leeWorkbook.getTeacher()));
            questionRepository.save(new Question(2, "객관식 퀴즈 질문", "선지 1번", "선지 2번", "선지 3번", "선지 4번", 2, leeWorkbook, leeWorkbook.getTeacher()));
            questionRepository.save(new Question(1, "OX 퀴즈 질문", "", "", "", "", 2, leeWorkbook, leeWorkbook.getTeacher()));
            questionRepository.save(new Question(2, "객관식 퀴즈 질문", "선지 1번", "선지 2번", "선지 3번", "선지 4번", 4, leeWorkbook, leeWorkbook.getTeacher()));

            // QuizResult
            quizResultRepository.save(new QuizResult(10, leeWorkbook, group, student));
            quizResultRepository.save(new QuizResult(10, leeWorkbook, group, student));
            quizResultRepository.save(new QuizResult(10, leeWorkbook, groupB, studentPark));
        };
    }
}
