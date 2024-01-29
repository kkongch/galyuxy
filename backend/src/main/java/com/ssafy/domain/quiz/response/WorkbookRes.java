package com.ssafy.domain.quiz.response;

import com.ssafy.domain.quiz.entity.Workbook;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class WorkbookRes {

    Long id;
    String title;
    int totalPoint;
    Timestamp createDate;
    Timestamp updateDate;

    public static WorkbookRes of(Workbook workbook) {
        WorkbookRes workbookRes = new WorkbookRes();
        workbookRes.setId(workbook.getId());
        workbookRes.setTitle(workbook.getTitle());
        workbookRes.setTotalPoint(workbook.getTotalPoint());
        workbookRes.setCreateDate(workbook.getCreateDate());
        workbookRes.setUpdateDate(workbook.getCreateDate());
        return workbookRes;
    }
}
