package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.dto.ActiveWorkbookDTO;
import com.ssafy.domain.quiz.dto.ActiveWorkbookProjection;

import java.util.List;

public interface ActiveWorkbookService {
    List<ActiveWorkbookProjection> findActiveWorkbookByGroupId(Integer groupId);
    ActiveWorkbookDTO putOne(ActiveWorkbookDTO activeWorkbookDTO);
}
