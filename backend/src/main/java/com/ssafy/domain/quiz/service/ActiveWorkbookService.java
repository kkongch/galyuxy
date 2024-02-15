//package com.ssafy.domain.quiz.service;
//
//import com.ssafy.domain.quiz.dto.ActiveWorkbookDTO;
//import com.ssafy.domain.quiz.dto.ActiveWorkbookProjection;
//
//import java.util.List;
//
//public interface ActiveWorkbookService {
//    List<ActiveWorkbookProjection> findActiveWorkbookByGroupId(Integer groupId);
//    ActiveWorkbookDTO putOne(ActiveWorkbookDTO activeWorkbookDTO);
//}

package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.dto.ActiveWorkbookDTO;
import com.ssafy.domain.quiz.entity.ActiveWorkbook;
import com.ssafy.domain.quiz.entity.Workbook;

import java.util.Optional;

public interface ActiveWorkbookService {

    Optional<Workbook> getWorkbookByGroupId(Integer groupId);

    void updateActiveWorkbook(ActiveWorkbookDTO request);
    ActiveWorkbook getActiveByGroupId(int groupId);

}
