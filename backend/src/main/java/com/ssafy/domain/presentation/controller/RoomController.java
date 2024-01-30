package com.ssafy.domain.presentation.controller;

import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.presentation.entity.Presentation;
import com.ssafy.domain.presentation.entity.Room;
import com.ssafy.domain.presentation.service.PresentationService;
import com.ssafy.domain.presentation.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService, PresentationService presentationService){
        this.roomService = roomService;
    }

    @GetMapping("/{presentationId}")
    public ResponseEntity<List<Map<String, Object>>> getRoomsByPresentationId(@PathVariable("presentationId") int presentationId){
        List<Map<String, Object>> rooms = roomService.getRoomsByPresentationId(presentationId);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }
}
