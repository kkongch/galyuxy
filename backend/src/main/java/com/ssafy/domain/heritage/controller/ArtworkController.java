package com.ssafy.domain.heritage.controller;

import com.ssafy.domain.heritage.Dto.ArtworkDto;
import com.ssafy.domain.heritage.Dto.ArtworkMapper;
import com.ssafy.domain.heritage.Dto.ArtworkResultDto;
import com.ssafy.domain.heritage.entity.Artwork;
import com.ssafy.domain.heritage.entity.ArtworkResult;
import com.ssafy.domain.heritage.service.ArtworkService;
import com.ssafy.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/info/{artworkId}")
    public ResponseEntity<Message<ArtworkDto>> getById(@PathVariable("artworkId") int id){
        ArtworkDto artwork = artworkService.getById(id);
        return ResponseEntity.ok().body(Message.success( artwork));
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

    @PostMapping(path = "/result", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message<Void>> postArtworkResult(@RequestBody ArtworkResultDto request) {
        System.out.println("request : " +request.toString());
        try {
            artworkService.saveResult(
                    request.getArtworkId(),
                    request.getStudentId(),
                    request.getImageUrl()
            );
            return ResponseEntity.ok().body(Message.success());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Message.fail("FAIL","Failed to save artwork result."));
        }
    }
}

