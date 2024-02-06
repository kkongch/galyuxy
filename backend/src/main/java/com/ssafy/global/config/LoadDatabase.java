//package com.ssafy.global.config;
//
//import com.ssafy.domain.classroom.entity.Group;
//import com.ssafy.domain.classroom.entity.Student;
//import com.ssafy.domain.classroom.entity.Teacher;
//import com.ssafy.domain.classroom.repository.GroupRepository;
//import com.ssafy.domain.classroom.repository.StudentRepository;
//import com.ssafy.domain.heritage.entity.Artwork;
//import com.ssafy.domain.heritage.entity.ArtworkResult;
//import com.ssafy.domain.heritage.entity.Era;
//import com.ssafy.domain.heritage.entity.Heritage;
//import com.ssafy.domain.heritage.repository.ArtworkRepository;
//import com.ssafy.domain.heritage.repository.ArtworkResultRepository;
//import com.ssafy.domain.heritage.repository.EraRepository;
//import com.ssafy.domain.heritage.repository.HeritageRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Bean;
//import org.springframework.boot.CommandLineRunner;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import com.ssafy.domain.classroom.repository.TeacherRepository;
//
//import java.sql.Timestamp;
//
//@Configuration
//public class LoadDatabase {
//
//    @Autowired
//    TeacherRepository teacherRepository;
//
//    @Autowired
//    GroupRepository groupRepository;
//
//    @Autowired
//    StudentRepository studentRepository;
//    @Autowired
//    EraRepository eraRepository;
//
//    @Autowired
//    HeritageRepository heritageRepository;
//
//    @Autowired
//    ArtworkRepository artworkRepository;
//    @Autowired
//    ArtworkResultRepository artworkResultRepository;
//
//
//
//    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
//
//    @Bean
//    CommandLineRunner initDatabase() {
//
//        return args -> {
//
//            // Teacher
//            log.info("Preloading " + teacherRepository.save(new Teacher("김선생", "kim@mail.com", "1111")));
//            log.info("Preloading " + teacherRepository.save(new Teacher("이선생", "lee@mail.com", "2222")));
//
//            Teacher teacher = new Teacher("박선생", "park@mail.com", "3333");
//            log.info("Preloading " + teacherRepository.save(teacher));
//
//            // Group
//            Group group = new Group("24년 1학기 장덕초 5학년 2반", teacher);
//            log.info("Preloading " + groupRepository.save(group));
//
//            //era
//            Era era1 = new Era("삼국시대", "고구려");
//            Era era2 = new Era("삼국시대", "백제");
//            Era era3 = new Era("삼국시대", "신라");
//            Era era4 = new Era("조선시대", "조선");
//            log.info("Preloading " + eraRepository.save(era1));
//            log.info("Preloading " + eraRepository.save(era2));
//            log.info("Preloading " + eraRepository.save(era3));
//            log.info("Preloading " + eraRepository.save(era4));
//
//            Heritage heri = new Heritage("고구려 유물", "고구려유물은 오래됨");
//            heri.setEra(era1);
//            heri.setHeritageImageUrl("https://galyuxy.s3.ap-northeast-2.amazonaws.com/heritage/%EA%B4%91%EA%B0%9C%ED%86%A0%EB%8C%80%EC%99%95%EB%A6%89%EB%B9%84.jpg");
//            Heritage heri2 = new Heritage("조선백자", "조선백자는 하얗다.");
//            heri2.setEra(era4);
//            log.info("Preloading " + heritageRepository.save(heri));
//            log.info("Preloading " + heritageRepository.save(heri2));
//
//            Student s1 = new Student(1,"김싸피");
//            s1.setGroup(group);
//            Student s2 = new Student(2,"이싸피");
//            s2.setGroup(group);
//            log.info("Preloading " + studentRepository.save(s1));
//            log.info("Preloading " + studentRepository.save(s2));
//
//            Artwork aw1 = new Artwork(1, "url");
//            aw1.setEra(era1);
//            aw1.setHeritage(heri);
//            log.info("Preloading " + artworkRepository.save(aw1));
//            Artwork aw2 = new Artwork(1, "url");
//            aw2.setEra(era4);
//            aw2.setHeritage(heri2);
//            log.info("Preloading " + artworkRepository.save(aw2));
//
//            ArtworkResult ar1 = new ArtworkResult(s1.getId(), new Timestamp(System.currentTimeMillis()), "url");
//            ar1.setArtwork(aw1);
//            log.info("Preloading " + artworkResultRepository.save(ar1));
//            ArtworkResult ar2 = new ArtworkResult(s1.getId(), new Timestamp(System.currentTimeMillis()), "url");
//            ar2.setArtwork(aw2);
//            log.info("Preloading " + artworkResultRepository.save(ar2));
//
//
//
//
//        };
//    }
//}
