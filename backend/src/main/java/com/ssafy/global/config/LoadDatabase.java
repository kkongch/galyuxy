package com.ssafy.global.config;

import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.repository.GroupRepository;
import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.repository.WorkbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ssafy.domain.classroom.repository.TeacherRepository;

import java.sql.Timestamp;

@Configuration
public class LoadDatabase {

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    WorkbookRepository workbookRepository;

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

            // Quiz
            log.info("Preloading " + workbookRepository.save(new Workbook("김선생 고구려 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), teacherKim)));
            log.info("Preloading " + workbookRepository.save(new Workbook("김선생 백제 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), teacherKim)));
            log.info("Preloading " + workbookRepository.save(new Workbook("김선생 신라 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), true, teacherKim)));

            log.info("Preloading " + workbookRepository.save(new Workbook("이선생 고구려 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), teacherLee)));
            log.info("Preloading " + workbookRepository.save(new Workbook("이선생 백제 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), true, teacherLee)));
            log.info("Preloading " + workbookRepository.save(new Workbook("이선생 신라 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), true, teacherLee)));

        };
    }
}
