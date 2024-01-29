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
            log.info("Preloading " + teacherRepository.save(new Teacher("김선생", "kim@mail.com", "1111")));
            log.info("Preloading " + teacherRepository.save(new Teacher("이선생", "lee@mail.com", "2222")));

            Teacher teacher = new Teacher("박선생", "park@mail.com", "3333");
            log.info("Preloading " + teacherRepository.save(teacher));

            log.info("Preloading " + teacherRepository.save(new Teacher("박선생", "park@mail.com", "4444")));

            // Group
            Group group = new Group("24년 1학기 장덕초 5학년 2반", teacher);
            log.info("Preloading " + groupRepository.save(group));

            // Quiz
            log.info("Preloading " + workbookRepository.save(new Workbook("고구려 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), teacher)));
            log.info("Preloading " + workbookRepository.save(new Workbook("백제 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), teacher)));
            log.info("Preloading " + workbookRepository.save(new Workbook("신라 문제집", 20, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), true, teacher)));
        };
    }
}
