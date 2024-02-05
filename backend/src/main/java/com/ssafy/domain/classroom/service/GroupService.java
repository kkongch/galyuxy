package com.ssafy.domain.classroom.service;


import com.ssafy.domain.classroom.dto.GroupDto;
import com.ssafy.domain.classroom.entity.Group;

import java.util.List;
import java.util.Optional;

public interface GroupService {

    Optional<Group> getGroupById(int groupId);
    List<GroupDto> getGroupListByTeacherId(int teacherId);
}
