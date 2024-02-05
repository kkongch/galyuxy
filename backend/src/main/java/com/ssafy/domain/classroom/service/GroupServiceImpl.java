package com.ssafy.domain.classroom.service;

import com.ssafy.domain.classroom.dto.GroupDto;
import com.ssafy.domain.classroom.dto.GroupMapper;
import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService{

    @Autowired
    private final GroupRepository groupRepository;

    public Optional<Group> getGroupById(int groupId) {
        return groupRepository.findById(groupId);
    }

    @Override
    public List<GroupDto> getGroupListByTeacherId(int teacherId) {
        List<Group> list = groupRepository.findByTeacherIdAndIsDeletedFalse(teacherId);
        return GroupMapper.toDtoList(list);
    }
}
