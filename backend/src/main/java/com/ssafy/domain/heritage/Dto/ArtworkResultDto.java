package com.ssafy.domain.heritage.Dto;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ArtworkResultDto {
    private int id;
    private Timestamp createTime;
    private String imageUrl;

    private int artworkId;

    private int studentId;
    private String studentName;
    

}
