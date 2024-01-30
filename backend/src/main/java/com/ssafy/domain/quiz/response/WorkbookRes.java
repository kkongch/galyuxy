package com.ssafy.domain.quiz.response;

import com.ssafy.domain.quiz.entity.Workbook;
import lombok.Getter;
import lombok.Setter;

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
