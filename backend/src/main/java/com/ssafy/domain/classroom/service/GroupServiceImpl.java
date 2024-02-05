package com.ssafy.domain.classroom.service;

import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService{

    @Autowired
    private final GroupRepository groupRepository;

    public Optional<Group> getGroupById(int groupId) {
        return groupRepository.findById(groupId);
    }
}
