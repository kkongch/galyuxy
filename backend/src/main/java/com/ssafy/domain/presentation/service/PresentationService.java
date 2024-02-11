package com.ssafy.domain.presentation.service;

import com.ssafy.domain.classroom.service.GroupService;
import com.ssafy.domain.presentation.entity.Presentation;
import com.ssafy.domain.presentation.repository.PresentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PresentationService {

    private final PresentationRepository presentationRepository;

    @Autowired
    public PresentationService(PresentationRepository presentationRepository, GroupService groupService) {
        this.presentationRepository = presentationRepository;
    }

    public List<Map<String, Object>> getPresentationsByGroupId(int groupId) {
        List<Presentation> presentations = presentationRepository.findByGroupIdAndPresentationIsDeletedFalse(groupId);
        return presentations.stream()
                .map(this::mapPresentationToResponse)
                .collect(Collectors.toList());
    }

    public List<Presentation> getActivePresentationByGroupId(int groupId) {
        return presentationRepository.findByGroupIdAndPresentationIsActiveTrue(groupId);
    }

    private Map<String, Object> mapPresentationToResponse(Presentation presentation) {
        Map<String, Object> presentationResponse = new HashMap<>();
        presentationResponse.put("presentationId", presentation.getPresentationId());
        presentationResponse.put("presentationTitle", presentation.getPresentationTitle());
        presentationResponse.put("presentationCreateDate", presentation.getPresentationCreateDate());
        presentationResponse.put("presentation_is_active", presentation.isPresentationIsActive() ? 1 : 0);
        return presentationResponse;
    }

    public Presentation createPresentation(Presentation presentation) {
        presentation.setPresentationCreateDate(Timestamp.valueOf(LocalDateTime.now()));
        presentation.setPresentationIsDeleted(false);

        return presentationRepository.save(presentation);
    }

    public Presentation updatePresentation(Presentation presentation) {
        return presentationRepository.save(presentation);
    }

    public Optional<Presentation> getPresentationById(int presentationId) {
        return presentationRepository.findById(presentationId);
    }

    public void activatePresentation(Integer presentationId) {
        presentationRepository.findById(presentationId)
                .ifPresent(presentation -> {
                    presentation.setPresentationIsActive(true);
                    presentationRepository.save(presentation);
                });
    }

    public void deactivatePresentation(Integer presentationId) {
        presentationRepository.findById(presentationId)
                .ifPresent(presentation -> {
                    presentation.setPresentationIsActive(false);
                    presentationRepository.save(presentation);
                });
    }
}
