package com.ssafy.domain.classroom.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class GroupStudentsDto {
    private GroupDto group;
    private List<StudentDto> students;

}
