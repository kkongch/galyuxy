package com.ssafy.domain.heritage.service;

import com.ssafy.domain.heritage.entity.Era;
import com.ssafy.domain.heritage.repository.EraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EraServiceImpl implements EraService{

    @Autowired
    private final EraRepository eraRepository;

    @Override
    public List<Era> getAll() {
        return eraRepository.findAll();
    }
}
