//package com.ssafy.domain.quiz.service;
//
//import com.ssafy.domain.classroom.entity.Group;
//import com.ssafy.domain.classroom.repository.GroupRepository;
//import com.ssafy.domain.quiz.dto.ActiveWorkbookDTO;
//import com.ssafy.domain.quiz.dto.ActiveWorkbookProjection;
//import com.ssafy.domain.quiz.entity.ActiveWorkbook;
//import com.ssafy.domain.quiz.entity.Workbook;
//import com.ssafy.domain.quiz.repository.ActiveWorkbookRepository;
//import com.ssafy.domain.quiz.repository.WorkbookRepository;
//import jakarta.persistence.EntityNotFoundException;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//public class ActiveWorkbookServieImpl implements ActiveWorkbookService {
//
//    private final GroupRepository groupRepository;
//    private final WorkbookRepository workbookRepository;
//    private final ActiveWorkbookRepository activeWorkbookRepository;
//
//    @Override
//    public ActiveWorkbookDTO putOne(ActiveWorkbookDTO activeWorkbookDTO) {
//
//        Integer groupId = activeWorkbookDTO.getGroupId();
//        Group group = groupRepository.findById(groupId)
//                .orElseThrow(() -> new EntityNotFoundException(String.format("Group %d Not Found", groupId)));
//
//        Integer workbookId = activeWorkbookDTO.getWorkbookId();
//        Workbook workbook = workbookRepository.findById(workbookId)
//                .orElseThrow(() -> new EntityNotFoundException(String.format("Workbook %d Not Found", workbookId)));
//
//        List<ActiveWorkbookProjection> existedActiveWorkbookDTOList = activeWorkbookRepository.findActiveWorkbookByGroupId(groupId);
//        if (existedActiveWorkbookDTOList.size() >= 1) {
//            ActiveWorkbookProjection existedActiveWorkbookProjection = existedActiveWorkbookDTOList.get(0);
//            Optional<ActiveWorkbook> optionalActiveWorkbook = activeWorkbookRepository.findById(existedActiveWorkbookProjection.getActiveWorkbookId());
//            ActiveWorkbook activeWorkbook = optionalActiveWorkbook.get();
//            activeWorkbook.setStart(activeWorkbookDTO.getActiveWorkbookStart());
//            activeWorkbook.setEnd(activeWorkbookDTO.getActiveWorkbookEnd());
//            activeWorkbook.setWorkbook(workbook);
//            activeWorkbookRepository.save(activeWorkbook);
//        } else {
//            ActiveWorkbook activeWorkbook = ActiveWorkbook.builder()
//                    .start(activeWorkbookDTO.getActiveWorkbookStart())
//                    .end(activeWorkbookDTO.getActiveWorkbookEnd())
//                    .group(group)
//                    .workbook(workbook)
//                    .build();
//            activeWorkbookRepository.save(activeWorkbook);
//        }
//        return activeWorkbookDTO;
//    }
//
//    @Override
//    public List<ActiveWorkbookProjection> findActiveWorkbookByGroupId(Integer groupId) {
//        return activeWorkbookRepository.findActiveWorkbookByGroupId(groupId);
//    }
//
//}

package com.ssafy.domain.quiz.service;

import com.ssafy.domain.quiz.dto.ActiveWorkbookDTO;
import com.ssafy.domain.quiz.entity.ActiveWorkbook;
import com.ssafy.domain.quiz.entity.Workbook;
import com.ssafy.domain.quiz.repository.ActiveWorkbookRepository;
import com.ssafy.domain.quiz.repository.WorkbookRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ActiveWorkbookServiceImpl implements ActiveWorkbookService {

    private final WorkbookRepository workbookRepository;
    private final ActiveWorkbookRepository activeWorkbookRepository;

    @Override
    public Optional<Workbook> getWorkbookByGroupId(Integer groupId) {
        List<ActiveWorkbook> activeWorkbookList = activeWorkbookRepository.findByGroupId(groupId);
        if (activeWorkbookList.size() < 1) {
            throw new EntityNotFoundException(String.format("ActiveWorkbook by GroupId %d Not Found", groupId));
        }
        ActiveWorkbook activeWorkbook = activeWorkbookList.get(0);
        Integer workbookId = activeWorkbook.getWorkbookId();
        return workbookRepository.findById(workbookId);
    }

    @Override
    public void updateActiveWorkbook(ActiveWorkbookDTO request) {
        List<ActiveWorkbook> activeWorkbookList= activeWorkbookRepository.findByGroupId(request.getGroupId());
            ActiveWorkbook activeWB = null;
        if (activeWorkbookList.size() < 1) {
            activeWB = new ActiveWorkbook();
        }else{
            activeWB = activeWorkbookList.get(0);
        }
        activeWB.setWorkbookId(request.getWorkbookId());
        activeWB.setGroupId(request.getGroupId());
        activeWB.setStart(request.getActiveWorkbookStart());
        activeWB.setEnd(request.getActiveWorkbookEnd());
        System.out.println(activeWB.toString());
        activeWorkbookRepository.save(activeWB);



    }

    @Override
    public ActiveWorkbook getActiveByGroupId(int groupId) {
        List<ActiveWorkbook> activeWB = activeWorkbookRepository.findByGroupId(groupId);
        if (activeWB.size() < 1) {
            return null;
        }else{
            return activeWB.get(0);
        }
    }
}
