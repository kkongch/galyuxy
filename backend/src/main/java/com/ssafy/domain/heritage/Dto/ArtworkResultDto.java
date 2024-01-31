package com.ssafy.domain.heritage.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArtworkResultDto {
    private int id;
    private Timestamp createTime;
    private String imageUrl;

    private int studentId;
    private String studentName;
    

}
