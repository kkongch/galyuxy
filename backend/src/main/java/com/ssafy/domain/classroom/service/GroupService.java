package com.ssafy.domain.classroom.service;


import com.ssafy.domain.classroom.dto.GroupDto;
import com.ssafy.domain.classroom.dto.GroupStudentsDto;
import com.ssafy.domain.classroom.dto.TeacherLoginActiveDto;
import com.ssafy.domain.classroom.entity.Group;

import java.util.List;
import java.util.Optional;

public interface GroupService {

    Optional<Group> getGroupById(int groupId);
    List<GroupDto> getGroupListByTeacherId(int teacherId);

    void saveGroupAndStudents(int teacherId, GroupStudentsDto request);

    Group updateName(GroupDto request);
    void delete(int groupId);
}
