package com.ssafy.domain.presentation.dto;

import com.ssafy.domain.presentation.entity.Presentation;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RoomPresentationDto {
    private String roomId;
    private String roomSubject;

    private PresentationDto presentation;
}
