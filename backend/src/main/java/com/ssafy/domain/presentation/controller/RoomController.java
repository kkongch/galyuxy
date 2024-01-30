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
import java.util.Optional;

@RestController
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;
    private final PresentationService presentationService;

    @Autowired
    public RoomController(RoomService roomService, PresentationService presentationService){
        this.roomService = roomService;
        this.presentationService = presentationService;
    }

    @GetMapping("/{presentationId}")
    public ResponseEntity<List<Map<String, Object>>> getRoomsByPresentationId(@PathVariable("presentationId") int presentationId){
        List<Map<String, Object>> rooms = roomService.getRoomsByPresentationId(presentationId);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createRoom(@RequestBody Room room){

        Presentation presentation = presentationService.getPresentationById(room.getPresentation().getPresentationId())
                .orElseThrow(() -> new RuntimeException("Presentation not found with id: " + room.getPresentation().getPresentationId()));

        room.setPresentation(presentation);
        Room createdRoom = roomService.createRoom(room);

        return new ResponseEntity<>("Room created with ID: " + createdRoom.getRoomId(), HttpStatus.CREATED);
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<String> updateRoom(@PathVariable("roomId") int roomId,
                                             @RequestBody Room updatedRoom){
        Optional<Room> existingRoomOptional = roomService.getRoomById(roomId);

        if (existingRoomOptional.isPresent()) {
            Room existingRoom = existingRoomOptional.get();
            existingRoom.setRoomSubject(updatedRoom.getRoomSubject());

            Room updatedRoomEntity = roomService.updateRoom(existingRoom);

            return new ResponseEntity<>("Room updated with ID: " + updatedRoomEntity.getRoomId(),
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Room not found with ID: " + roomId, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<String> deleteRoom(@PathVariable("roomId") int roomId){
        Optional<Room> existingRoomOptional = roomService.getRoomById(roomId);

        if (existingRoomOptional.isPresent()) {
            Room existingRoom = existingRoomOptional.get();
            existingRoom.setRoomIsDeleted(true);

            roomService.updateRoom(existingRoom);

            return new ResponseEntity<>("Room deleted with ID: " + roomId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Room not found with ID: " + roomId, HttpStatus.NOT_FOUND);
        }
    }
}
