package com.ssafy.domain.classroom.dto;

import com.ssafy.domain.classroom.entity.enums.Role;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupDto {

    private int id;
    private String name;
    private boolean isDeleted;
}
