package com.ssafy.domain.presentation.dto;

import com.ssafy.domain.classroom.dto.GroupDto;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PresentationDto {

    private Integer presentationId;
    private String presentationTitle;
    private Timestamp presentationCreateDate;
    private boolean presentationIsActive;
    private boolean presentationIsDeleted;
}
