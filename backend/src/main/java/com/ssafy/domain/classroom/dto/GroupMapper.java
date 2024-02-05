package com.ssafy.domain.classroom.dto;

import com.ssafy.domain.classroom.entity.Group;

import java.util.List;
import java.util.stream.Collectors;

public class GroupMapper {
    public static GroupDto toDto(Group group){
        GroupDto dto = new GroupDto();
        dto.setId(group.getId());
        dto.setName(group.getName());
        dto.setDeleted(group.isDeleted());
        return dto;
    }

    public static List<GroupDto> toDtoList(List<Group> groupList){
        return groupList.stream().map(GroupMapper::toDto)
                .collect(Collectors.toList());
    }
}
