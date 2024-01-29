package com.ssafy.domain.presentation.service;

import com.ssafy.domain.presentation.Exception.NotFoundException;
import com.ssafy.domain.presentation.entity.Presentation;
import com.ssafy.domain.presentation.repository.PresentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PresentationService {

    private final PresentationRepository presentationRepository;

    @Autowired
    public PresentationService(PresentationRepository presentationRepository) {
        this.presentationRepository = presentationRepository;
    }

    public List<Map<String, Object>> getActivePresentationsByGroupId(int groupId) {
        List<Presentation> presentations = presentationRepository.findByGroupGroupIdAndPresentationIsDeletedFalse(groupId);
        return presentations.stream()
                .map(this::mapPresentationToResponse)
                .collect(Collectors.toList());
    }

    private Map<String, Object> mapPresentationToResponse(Presentation presentation) {
        Map<String, Object> presentationResponse = new HashMap<>();
        presentationResponse.put("presentationId", presentation.getPresentationId());
        presentationResponse.put("presentationTitle", presentation.getPresentationTitle());
        presentationResponse.put("presentationCreateDate", presentation.getPresentationCreateDate());
        presentationResponse.put("presentation_is_active", presentation.isPresentationIsActive() ? 1 : 0);
        return presentationResponse;
    }
}
