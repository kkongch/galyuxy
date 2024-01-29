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
            Group group = groupService.getGroupById(presentation.getGroup().getGroupId())
                    .orElseThrow(() -> new RuntimeException("Group not found with id: " + presentation.getGroup().getGroupId()));

            presentation.setGroup(group);
            Presentation createdPresentation = presentationService.createPresentation(presentation);

            return new ResponseEntity<>("Presentation created with ID: " + createdPresentation.getPresentationId(), HttpStatus.CREATED);

        }catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Error: Presentation title must be unique within a group.", HttpStatus.BAD_REQUEST);
        }
    }

}
