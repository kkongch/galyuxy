package com.ssafy.domain.presentation.controller;

import com.ssafy.domain.presentation.dto.RoomPresentationDto;
import com.ssafy.domain.presentation.entity.Presentation;
import com.ssafy.domain.presentation.entity.Room;
import com.ssafy.domain.presentation.entity.StudentRoom;
import com.ssafy.domain.presentation.service.PresentationService;
import com.ssafy.domain.presentation.service.RoomService;
import com.ssafy.domain.presentation.service.StudentRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;
    private final PresentationService presentationService;
    private final StudentRoomService studentRoomService;

    @Autowired
    public RoomController(RoomService roomService, PresentationService presentationService, StudentRoomService studentRoomService){
        this.roomService = roomService;
        this.presentationService = presentationService;
        this.studentRoomService = studentRoomService;
    }

    @GetMapping("/{presentationId}")
    public ResponseEntity<List<Map<String, Object>>> getRoomsByPresentationId(@PathVariable("presentationId") int presentationId){
        List<Map<String, Object>> rooms = roomService.getRoomsByPresentationId(presentationId);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createRoom(@RequestBody RoomPresentationDto request){
        System.out.println("qwerasf");

        Room room = Room.builder()
                .roomId(request.getRoomId())
                .roomSubject(request.getRoomSubject())
                .presentation(Presentation.builder().presentationId(request.getPresentation().getPresentationId()).build())
                .build();

        System.out.println("room: " + room);

        Room createdRoom = roomService.createRoom(room);

        return new ResponseEntity<>("Room created with ID: " + createdRoom.getRoomId(), HttpStatus.CREATED);
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<String> updateRoom(@PathVariable("roomId") String roomId,
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
    public ResponseEntity<String> deleteRoom(@PathVariable("roomId") String roomId){
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

    @PostMapping("/join")
    public ResponseEntity<StudentRoom> addStudentToRoom(@RequestBody Map<String, Integer> requestData) {
        try {
            String roomId = String.valueOf(requestData.get("roomId"));
            Integer studentId = requestData.get("studentId");

            StudentRoom addedStudentRoom = studentRoomService.addStudentToRoom(roomId, studentId);
            return new ResponseEntity<>(addedStudentRoom, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/user/{roomId}/{studentId}")
    public ResponseEntity<Void> deleteStudentFromRoom(@PathVariable("roomId") String roomId, @PathVariable("studentId") int studentId) {
        studentRoomService.deleteStudentFromRoom(roomId, studentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
