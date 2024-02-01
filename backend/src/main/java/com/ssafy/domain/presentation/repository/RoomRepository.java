package com.ssafy.domain.presentation.repository;

import com.ssafy.domain.presentation.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, String> {
    List<Room> findByPresentationPresentationIdAndRoomIsDeletedFalse(int presentationId);
}
