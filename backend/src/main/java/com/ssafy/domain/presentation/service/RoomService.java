package com.ssafy.domain.presentation.service;

import com.ssafy.domain.presentation.entity.Presentation;
import com.ssafy.domain.presentation.entity.Room;
import com.ssafy.domain.presentation.repository.PresentationRepository;
import com.ssafy.domain.presentation.repository.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {
    @Autowired
    private PresentationRepository presentationRepository;

    @Autowired
    private RoomRepository roomRepository;

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
        Presentation presentation = presentationRepository.findById(room.getPresentation().getPresentationId())
                .orElseThrow(() -> new EntityNotFoundException("Presentation not found"));

        room.setPresentation(presentation);

        return roomRepository.save(room);
    }

    public Room updateRoom(Room room){
        return roomRepository.save(room);
    }

    public Optional<Room> getRoomById(String roomId){
        return roomRepository.findById(roomId);
    }
}
