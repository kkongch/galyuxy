package com.ssafy.domain.heritage.controller;

import com.ssafy.domain.heritage.entity.Heritage;
import com.ssafy.domain.heritage.service.HeritageService;
import com.ssafy.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/heritage")
@Slf4j // 로깅
public class HeritageController {
    private final HeritageService heritageService;

    // 전체 문화유산 목록 불러오기
    @GetMapping
    public ResponseEntity<Message<List<Heritage>>> getAllHeritage(){
        List<Heritage> heritageList = heritageService.getAll();
        return ResponseEntity.ok().body(Message.success(heritageList));
    }

    // 문화유산 id로 세부정보 불러오기
    @GetMapping("/{heritageId}")
    public ResponseEntity<Message<Heritage>> getOneHeritageById(@PathVariable("heritageId") int id){
        Optional<Heritage> optionalHeritage = heritageService.getById(id);

        return optionalHeritage.map(heritage ->
                ResponseEntity.ok().body(Message.success(heritage)))
                .orElse(ResponseEntity.status(404).body(Message.fail("404", "Heritage not found")));
    }
}
