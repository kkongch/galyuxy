package com.ssafy.domain.quiz.response;

import com.ssafy.domain.quiz.entity.Workbook;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class WorkbookRes {

    Integer workbookId;
    String workbookTitle;

    public static WorkbookRes of(Workbook workbook) {
        WorkbookRes workbookRes = new WorkbookRes();
        workbookRes.setWorkbookId(workbook.getId());
        workbookRes.setWorkbookTitle(workbook.getTitle());
        return workbookRes;
    }
}
