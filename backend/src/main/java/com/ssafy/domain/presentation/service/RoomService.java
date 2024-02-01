package com.ssafy.domain.presentation.service;

import com.ssafy.domain.presentation.entity.Room;
import com.ssafy.domain.presentation.repository.RoomRepository;
import com.ssafy.domain.presentation.repository.StudentRoomRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository, StudentRoomRepository studentRoomRepository){
        this.roomRepository = roomRepository;
    }

    public List<Map<String, Object>> getRoomsByPresentationId(int presentationId){
        List<Room> rooms = roomRepository.findByPresentationPresentationIdAndRoomIsDeletedFalse(presentationId);
        return rooms.stream()
                .map(this::mapRoomToResponse)
                .collect(Collectors.toList());
    }

    private Map<String, Object> mapRoomToResponse(Room room) {
        Map<String, Object> roomResponse = new HashMap<>();
        roomResponse.put("roomId", room.getRoomId());
        roomResponse.put("roomSubject", room.getRoomSubject());
        roomResponse.put("roomScript", room.getRoomScript());
        return roomResponse;
    }

    public Room createRoom(Room room){
        room.setRoomIsDeleted(false);
        room.setRoomScript(null);

        return roomRepository.save(room);
    }

    public Room updateRoom(Room room){
        return roomRepository.save(room);
    }

    public Optional<Room> getRoomById(int roomId){
        return roomRepository.findById(roomId);
    }
}
