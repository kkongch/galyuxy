package com.ssafy.domain.heritage.service;

import com.ssafy.domain.heritage.entity.Heritage;

import java.util.List;
import java.util.Optional;

public interface HeritageService {

    List<Heritage> getAll();
    Optional<Heritage> getById(int id);


}
