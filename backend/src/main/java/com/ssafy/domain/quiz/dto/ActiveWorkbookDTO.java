package com.ssafy.domain.quiz.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ActiveWorkbookDTO {
    Integer groupId;
    Integer workbookId;
    String workbookTitle;
    Integer activeWorkbookId;
    Timestamp activeWorkbookStart;
    Timestamp activeWorkbookEnd;
}
