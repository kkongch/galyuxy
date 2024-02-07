package com.ssafy.domain.classroom.service;

import com.ssafy.domain.classroom.dto.*;
import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.entity.Student;
import com.ssafy.domain.classroom.entity.Teacher;
import com.ssafy.domain.classroom.repository.GroupRepository;
import com.ssafy.domain.classroom.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    @Autowired
    private final GroupRepository groupRepository;
    @Autowired
    private final StudentRepository studentRepository;

    public Optional<Group> getGroupById(int groupId) {
        return groupRepository.findById(groupId);
    }

    @Override
    public List<GroupDto> getGroupListByTeacherId(int teacherId) {
        List<Group> list = groupRepository.findByTeacherIdAndIsDeletedFalse(teacherId);
        return GroupMapper.toDtoList(list);
    }

    @Override
    public void saveGroupAndStudents(int teacherId, GroupStudentsDto request) {
        System.out.println("group DTO ");
        System.out.println(request.getGroup().toString());
        // 그룹 먼저 저장 하고 id 가져오기
        Group newGroup = Group.builder()
                .name(request.getGroup().getName())
                .isDeleted(false)
                .teacher(Teacher.builder()
                        .id(teacherId)
                        .build()
                )
                .build();
        newGroup = groupRepository.save(newGroup);
        System.out.println("new Group id " + newGroup.getId());

        // 학생 있는지 확인하고 저장
        System.out.println("students DTO ");
//        System.out.println(request.getStudents().toString());
        for (StudentDto s : request.getStudents()) {  //이부분 이상함
            Student newStudent = StudentMapper.toEntity(s);
            newStudent.setGroup(newGroup);
            studentRepository.save(newStudent);
        }


    }

    @Override
    public Group updateName(GroupDto request) {
        Group group = getGroupById(request.getId()).orElse(null);
        if (group != null) {
            group.setName(request.getName());
            return groupRepository.save(group);
        } else{
            return group;
        }
    }

    @Override
    public void delete(int groupId) {

        Group group = getGroupById(groupId).orElse(null);

        if (group != null) {
            group.setDeleted(true);
            groupRepository.save(group);
        }
        else
            throw new ClassCastException("해당 그룹을 찾을 수 없음");
    }
}
