package com.ssafy.domain.classroom.service;


import com.ssafy.domain.classroom.entity.Group;
import com.ssafy.domain.classroom.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GroupService {

    private final GroupRepository groupRepository;

    @Autowired
    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public Optional<Group> getGroupById(int groupId) {
        return groupRepository.findByGroupId(groupId);
    }
}