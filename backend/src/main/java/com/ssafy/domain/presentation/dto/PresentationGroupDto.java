package com.ssafy.domain.presentation.dto;

import com.ssafy.domain.classroom.dto.GroupDto;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PresentationGroupDto {
    private String presentationTitle;

    private GroupDto group;
}
