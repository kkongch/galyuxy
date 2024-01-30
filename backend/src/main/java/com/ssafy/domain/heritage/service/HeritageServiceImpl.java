package com.ssafy.domain.heritage.service;

import com.ssafy.domain.heritage.entity.Heritage;
import com.ssafy.domain.heritage.repository.HeritageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HeritageServiceImpl implements HeritageService{

    @Autowired
    private final HeritageRepository heritageRepository;

    @Override
    public List<Heritage> getAll() {
        return heritageRepository.findAll();
    }


    public Optional<Heritage> getById(int id) {
        return heritageRepository.findById(id);
    }
}
