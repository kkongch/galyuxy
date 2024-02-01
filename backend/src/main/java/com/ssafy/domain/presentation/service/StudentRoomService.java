package com.ssafy.domain.presentation.service;

import com.ssafy.domain.classroom.entity.Student;
import com.ssafy.domain.classroom.repository.StudentRepository;
import com.ssafy.domain.presentation.entity.Room;
import com.ssafy.domain.presentation.entity.StudentRoom;
import com.ssafy.domain.presentation.repository.RoomRepository;
import com.ssafy.domain.presentation.repository.StudentRoomRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentRoomService {

    @Autowired
    private StudentRoomRepository studentRoomRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private StudentRepository studentRepository;

    public StudentRoom addStudentToRoom(String roomId, Integer studentId) {
        StudentRoom studentRoom = new StudentRoom();

        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));

        studentRoom.setRoom(room);
        studentRoom.setStudent(student);

        return studentRoomRepository.save(studentRoom);
    }

    @Transactional
    public void deleteStudentFromRoom(String roomId, Integer studentId) {
        studentRoomRepository.deleteByRoomRoomIdAndStudentId(roomId, studentId);
    }
}