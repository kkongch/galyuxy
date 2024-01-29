package com.ssafy.global.config;

import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ssafy.domain.classroom.repository.TeacherRepository;

@Configuration
public class LoadDatabase {

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    GroupRepository groupRepository;

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase() {

        return args -> {

            // Teacher
            log.info("Preloading " + teacherRepository.save(new Teacher("김선생", "kim@mail.com", "1111")));
            log.info("Preloading " + teacherRepository.save(new Teacher("이선생", "lee@mail.com", "2222")));

            Teacher teacher = new Teacher("박선생", "park@mail.com", "3333");
            log.info("Preloading " + teacherRepository.save(teacher));

            // Group
            Group group = new Group("24년 1학기 장덕초 5학년 2반", teacher);
            log.info("Preloading " + groupRepository.save(group));

        };
    }
}
