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

package com.ssafy.domain.quiz.controller;

import com.ssafy.domain.classroom.dto.GroupStudentsDto;
import com.ssafy.domain.classroom.dto.TeacherLoginActiveDto;
import com.ssafy.domain.quiz.dto.ActiveWorkbookDTO;
import com.ssafy.domain.quiz.entity.ActiveWorkbook;
import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.repository.ActiveWorkbookRepository;
import com.ssafy.domain.quiz.service.ActiveWorkbookService;
import com.ssafy.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/quiz/activeWorkbook")
@RequiredArgsConstructor
public class ActiveWorkbookController {

    private final ActiveWorkbookService activeWorkbookService;

//    @PutMapping("/start")
//    ResponseEntity<Message<ActiveWorkbookDTO>> putActiveWorkbook(@RequestBody ActiveWorkbookDTO activeWorkbookDTO) {
//        try {
//            ActiveWorkbookDTO postedActiveWorkbookDTO = activeWorkbookService.putOne(activeWorkbookDTO);
//            return ResponseEntity.ok().body(Message.success(postedActiveWorkbookDTO, "OK", null));
//        } catch (EntityNotFoundException entityNotFoundException) {
//            throw entityNotFoundException;
//        }
//    }

    @GetMapping("/{groupId}")
    ResponseEntity<Message<ActiveWorkbookDTO>> getActiveWorkbook(@PathVariable("groupId") int groupId) {
        ActiveWorkbookDTO activeWorkbookDTO = null;
        Optional<Workbook> optionalWorkbook = activeWorkbookService.getWorkbookByGroupId(groupId);
        if (optionalWorkbook.isPresent()) {
            Workbook workbook = optionalWorkbook.get();
            ActiveWorkbook active = activeWorkbookService.getActiveByGroupId(groupId);

            activeWorkbookDTO = new ActiveWorkbookDTO();
            activeWorkbookDTO.setWorkbookId(workbook.getId());
            activeWorkbookDTO.setWorkbookTitle(workbook.getTitle());
            activeWorkbookDTO.setActiveWorkbookStart(active.getStart());
            activeWorkbookDTO.setActiveWorkbookEnd(active.getEnd());
        }
        return ResponseEntity.ok().body(Message.success(activeWorkbookDTO, "OK", null));
    }

    @PutMapping("/start")
    ResponseEntity<Message<Void>> putActiveWorkbookStart(@RequestBody ActiveWorkbookDTO request) {
        activeWorkbookService.updateActiveWorkbook(request);


        return ResponseEntity.ok().body(Message.success());
    }

}
