package com.ssafy.domain.presentation.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {
    private String roomId;
    private String roomSubject;
    private String roomScript;
    private boolean roomIsDeleted;
}
