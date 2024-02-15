package com.ssafy.domain.heritage.controller;

import com.ssafy.domain.heritage.entity.Era;
import com.ssafy.domain.heritage.service.EraService;
import com.ssafy.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/era")
@Slf4j // 로깅
public class EraController {

    private final EraService eraService;

    // 전체 시대 이름, 시대별 나라이름 불러오기
    @GetMapping
    public ResponseEntity<Message<List<Era>>> getAllEra(){
        List<Era> eraList = eraService.getAll();
        return ResponseEntity.ok().body(Message.success(eraList));
    }

 }
