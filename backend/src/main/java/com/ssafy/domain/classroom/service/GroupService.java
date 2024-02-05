package com.ssafy.domain.classroom.service;


import com.ssafy.domain.classroom.entity.Group;

import java.util.Optional;

public interface GroupService {

    Optional<Group> getGroupById(int groupId);
}
