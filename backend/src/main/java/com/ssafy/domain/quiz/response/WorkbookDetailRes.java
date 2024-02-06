package com.ssafy.domain.quiz.response;

import com.ssafy.domain.quiz.entity.Question;
import com.ssafy.domain.quiz.entity.Workbook;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class WorkbookDetailRes {

    WorkbookRes workbookRes;
    List<QuestionRes> questionResList;

    public static WorkbookDetailRes of(Workbook workbook, List<Question> questionList) {
        WorkbookDetailRes workbookDetailRes = new WorkbookDetailRes();
        workbookDetailRes.setWorkbookRes(WorkbookRes.of(workbook));
        List<QuestionRes> questionResList = questionList.stream()
                .map(QuestionRes::of)
                .collect(Collectors.toList());
        workbookDetailRes.setQuestionResList(questionResList);
        return workbookDetailRes;
    }
}
