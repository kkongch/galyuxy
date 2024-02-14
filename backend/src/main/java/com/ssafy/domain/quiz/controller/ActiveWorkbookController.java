//package com.ssafy.domain.quiz.controller;
//
//import com.ssafy.domain.quiz.dto.ActiveWorkbookDTO;
//import com.ssafy.domain.quiz.dto.ActiveWorkbookProjection;
//import com.ssafy.domain.quiz.response.QuestionRes;
//import com.ssafy.domain.quiz.service.ActiveWorkbookService;
//import com.ssafy.global.common.dto.Message;
//import jakarta.persistence.EntityNotFoundException;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/quiz/activeWorkbook")
//@RequiredArgsConstructor
//public class ActiveWorkbookController {
//
//    private final ActiveWorkbookService activeWorkbookService;
//
//    @PutMapping("/start")
//    ResponseEntity<Message<ActiveWorkbookDTO>> putActiveWorkbook(@RequestBody ActiveWorkbookDTO activeWorkbookDTO) {
//        try {
//            ActiveWorkbookDTO postedActiveWorkbookDTO = activeWorkbookService.putOne(activeWorkbookDTO);
//            return ResponseEntity.ok().body(Message.success(postedActiveWorkbookDTO, "OK", null));
//        } catch (EntityNotFoundException entityNotFoundException) {
//            throw entityNotFoundException;
//        }
//    }
//
//    @GetMapping("/{groupId}")
//    ResponseEntity<Message<ActiveWorkbookDTO>> getActiveWorkbook(@PathVariable("groupId") Integer groupId) {
//        ActiveWorkbookDTO activeWorkbookDTO = null;
//        List<ActiveWorkbookProjection> activeWorkbookProjectionList = activeWorkbookService.findActiveWorkbookByGroupId(groupId);
//        System.out.println(activeWorkbookProjectionList);
//        if (activeWorkbookProjectionList.size() >= 1) {
//            ActiveWorkbookProjection activeWorkbookProjection = activeWorkbookProjectionList.get(0);
//            activeWorkbookDTO = new ActiveWorkbookDTO();
//            activeWorkbookDTO.setWorkbookId(activeWorkbookProjection.getActiveWorkbookId());
//            activeWorkbookDTO.setWorkbookTitle(activeWorkbookProjection.getWorkbookTitle());
//            activeWorkbookDTO.setActiveWorkbookStart(activeWorkbookProjection.getActiveWorkbookStart());
//            activeWorkbookDTO.setActiveWorkbookEnd(activeWorkbookProjection.getActiveWorkbookEnd());
//        }
//        return ResponseEntity.ok().body(Message.success(activeWorkbookDTO, "OK", null));
//    }
//}
