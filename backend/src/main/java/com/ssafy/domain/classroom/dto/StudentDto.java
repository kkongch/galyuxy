package com.ssafy.domain.classroom.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto {
    private int id;
    private int no;
    private String name;
    private boolean isDeleted;

}
