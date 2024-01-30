package com.ssafy.domain.heritage.controller;

import com.ssafy.domain.heritage.entity.Heritage;
import com.ssafy.domain.heritage.service.HeritageService;
import com.ssafy.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/heritage")
@Slf4j // 로깅
public class HeritageController {
    private final HeritageService heritageService;

    @GetMapping
    public ResponseEntity<Message<List<Heritage>>> getAllHeritage(){
        List<Heritage> heritageList = heritageService.getAll();
        return ResponseEntity.ok().body(Message.success(heritageList));
    }

    @GetMapping("/{heritageId}")
    public ResponseEntity<Message<Heritage>> getOneHeritageById(@PathVariable("heritageId") int id){
        Optional<Heritage> optionalHeritage = heritageService.getById(id);

        return optionalHeritage.map(heritage ->
                ResponseEntity.ok().body(Message.success(heritage)))
                .orElse(ResponseEntity.status(404).body(Message.fail("NOT_FOUND", "Heritage not found")));
    }


}
