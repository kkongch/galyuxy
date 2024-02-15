//package com.ssafy.domain.quiz.repository;
//
//import com.ssafy.domain.quiz.dto.ActiveWorkbookDTO;
//import com.ssafy.domain.quiz.dto.ActiveWorkbookProjection;
//import com.ssafy.domain.quiz.entity.ActiveWorkbook;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import java.util.List;
//
//public interface ActiveWorkbookRepository extends JpaRepository<ActiveWorkbook, Integer> {
//
//    @Query("SELECT w.title AS workbookTitle, " +
//            "aw.id AS activeWorkbookId, " +
//            "aw.start AS activeWorkbookStart, " +
//            "aw.end AS activeWorkbookEnd " +
//            "FROM ActiveWorkbook aw " +
//            "JOIN aw.group g " +
//            "JOIN aw.workbook w " +
//            "WHERE g.id = :groupId")
//    List<ActiveWorkbookProjection> findActiveWorkbookByGroupId(@Param("groupId") Integer groupId);
//}

package com.ssafy.domain.quiz.repository;

import com.ssafy.domain.quiz.entity.ActiveWorkbook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActiveWorkbookRepository extends JpaRepository<ActiveWorkbook, Integer> {

    List<ActiveWorkbook> findByGroupId(Integer groupId);
    ActiveWorkbook findByWorkbookIdAndGroupId(int workbookId, int groupId);

}
