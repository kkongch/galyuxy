package com.ssafy.domain.presentation.controller;

import com.ssafy.domain.presentation.entity.Presentation;
import com.ssafy.domain.presentation.service.PresentationService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public PresentationController(PresentationService presentationService){
        this.presentationService = presentationService;
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<List<Map<String, Object>>> getActivePresentationsByGroupId(@PathVariable("groupId") int groupId) {
        List<Map<String, Object>> activePresentations = presentationService.getActivePresentationsByGroupId(groupId);
        return new ResponseEntity<>(activePresentations, HttpStatus.OK);
    }

}
