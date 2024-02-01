package com.ssafy.domain.presentation.controller;

import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.service.GroupService;
import com.ssafy.domain.presentation.entity.Presentation;
import com.ssafy.domain.presentation.service.PresentationService;
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
public class PresentationController {

    private final PresentationService presentationService;
    private final GroupService groupService;

    @Autowired
    public PresentationController(PresentationService presentationService, GroupService groupService){
        this.presentationService = presentationService;
        this.groupService = groupService;
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<List<Map<String, Object>>> getActivePresentationsByGroupId(@PathVariable("groupId") int groupId) {
        List<Map<String, Object>> activePresentations = presentationService.getActivePresentationsByGroupId(groupId);
        return new ResponseEntity<>(activePresentations, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createPresentation(@RequestBody Presentation presentation) {

        try {
            Group group = groupService.getGroupById(presentation.getGroup().getId())
                    .orElseThrow(() -> new RuntimeException("Group not found with id: " + presentation.getGroup().getId()));

            presentation.setGroup(group);
            Presentation createdPresentation = presentationService.createPresentation(presentation);

            return new ResponseEntity<>("Presentation created with ID: " + createdPresentation.getPresentationId(), HttpStatus.CREATED);

        }catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Error: Presentation title must be unique within a group.", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{presentationId}")
    public ResponseEntity<String> updatePresentation(
            @PathVariable("presentationId") int presentationId,
            @RequestBody Presentation updatedPresentation) {

        try{
            Optional<Presentation> existingPresentationOptional = presentationService.getPresentationById(presentationId);

            if (existingPresentationOptional.isPresent()) {
                Presentation existingPresentation = existingPresentationOptional.get();
                existingPresentation.setPresentationTitle(updatedPresentation.getPresentationTitle());

                Presentation updatedPresentationEntity = presentationService.updatePresentation(existingPresentation);

                return new ResponseEntity<>("Presentation updated with ID: " + updatedPresentationEntity.getPresentationId(),
                        HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Presentation not found with ID: " + presentationId, HttpStatus.NOT_FOUND);
            }
        }catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Error: Presentation title must be unique within a group.", HttpStatus.BAD_REQUEST);
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
