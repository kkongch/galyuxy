package com.ssafy.domain.heritage.controller;

import com.ssafy.domain.heritage.Dto.ArtworkResultDto;
import com.ssafy.domain.heritage.entity.Artwork;
import com.ssafy.domain.heritage.entity.ArtworkResult;
import com.ssafy.domain.heritage.service.ArtworkService;
import com.ssafy.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/artwork")
@Slf4j // 로깅
public class ArtworkController {

    private final ArtworkService artworkService;

    @GetMapping("/{artworkType}")
    public ResponseEntity<Message<List<Artwork>>> getByType(@PathVariable("artworkType") int type){
        List<Artwork> artworkList = artworkService.getByType(type);
        return ResponseEntity.ok().body(Message.success(artworkList));
    }

    @GetMapping("/result/{groupId}")
    public ResponseEntity<Message<List<ArtworkResultDto>>> getResultByGroupId(@PathVariable("groupId") int id){
        List<ArtworkResultDto> arDtoList = artworkService.getResultByGroupId(id);
        return ResponseEntity.ok().body(Message.success(arDtoList));
    }

    @GetMapping("/result/student/{studentId}")
    public ResponseEntity<Message<List<ArtworkResultDto>>> getResultByStudentId(@PathVariable("studentId")int id){
        List<ArtworkResultDto> arDtoList = artworkService.getResultByStudentId(id);
        return ResponseEntity.ok().body(Message.success(arDtoList));
    }

}

