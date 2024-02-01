package com.ssafy.domain.quiz.request;

import lombok.Getter;

@Getter
public class WorkbookReq {

    Integer teacherId;
    String workbookTitle;
    int workbookTotalPoint;
}
