package com.ssafy.domain.presentation.controller;

import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.service.GroupService;
import com.ssafy.domain.heritage.entity.Era;
import com.ssafy.domain.presentation.dto.PresentationDto;
import com.ssafy.domain.presentation.dto.PresentationGroupDto;
import com.ssafy.domain.presentation.entity.Presentation;
import com.ssafy.domain.presentation.repository.PresentationRepository;
import com.ssafy.domain.presentation.service.PresentationService;
import com.ssafy.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/presentation")
@RequiredArgsConstructor
public class PresentationController {

    @Autowired
    private final PresentationService presentationService;

    @Autowired
    private final GroupService groupService;

    @GetMapping("/{groupId}")
    public ResponseEntity<List<Map<String, Object>>> getActivePresentationsByGroupId(@PathVariable("groupId") int groupId) {
        List<Map<String, Object>> activePresentations = presentationService.getActivePresentationsByGroupId(groupId);
        return new ResponseEntity<>(activePresentations, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createPresentation(@RequestBody PresentationGroupDto request) {

        try {
            Presentation pp = Presentation.builder()
                    .presentationTitle(request.getPresentationTitle())
                    .group(Group.builder().id(request.getGroup().getId()).build())
                    .presentationIsActive(false)
                    .build();

            Presentation createdPresentation = presentationService.createPresentation(pp);
//
            return new ResponseEntity<>("Presentation created with ID: " + createdPresentation.getPresentationId(), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Error: Presentation title must be unique within a group.", HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/{presentationId}")
    public ResponseEntity<Message<Void>> updatePresentation(
            @PathVariable("presentationId") int presentationId,
            @RequestBody PresentationDto request) {

        try {
            Presentation existPresentation = presentationService.getPresentationById(presentationId).orElse(null);

            if (existPresentation != null) {
                existPresentation.setPresentationTitle(request.getPresentationTitle());
                presentationService.updatePresentation(existPresentation);


                return ResponseEntity.ok().body(Message.success());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Message.fail(String.valueOf(HttpStatus.NOT_FOUND), "Presentation not found with ID: " + presentationId));
            }

        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok().body(Message.fail(String.valueOf(HttpStatus.BAD_REQUEST), "Error: Presentation title must be unique within a group."));
        }
    }

    @DeleteMapping("/{presentationId}")
    public ResponseEntity<String> deletePresentation(@PathVariable("presentationId") int presentationId) {
        Optional<Presentation> existingPresentationOptional = presentationService.getPresentationById(presentationId);

        if (existingPresentationOptional.isPresent()) {
            Presentation existingPresentation = existingPresentationOptional.get();
            existingPresentation.setPresentationIsDeleted(true);

            presentationService.updatePresentation(existingPresentation);

            return new ResponseEntity<>("Presentation deleted with ID: " + presentationId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Presentation not found with ID: " + presentationId, HttpStatus.NOT_FOUND);
        }
    }
}
