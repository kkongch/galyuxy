package com.ssafy.domain.heritage.service;

import com.ssafy.domain.classroom.entity.Student;
import com.ssafy.domain.classroom.repository.StudentRepository;
import com.ssafy.domain.heritage.Dto.ArtworkDto;
import com.ssafy.domain.heritage.Dto.ArtworkMapper;
import com.ssafy.domain.heritage.Dto.ArtworkResultDto;
import com.ssafy.domain.heritage.Dto.ArtworkResultMapper;
import com.ssafy.domain.heritage.entity.Artwork;
import com.ssafy.domain.heritage.entity.ArtworkResult;
import com.ssafy.domain.heritage.repository.ArtworkRepository;
import com.ssafy.domain.heritage.repository.ArtworkResultRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArtworkServiceImpl implements ArtworkService{

    @Autowired
    private final ArtworkRepository artworkRepository;
    @Autowired
    private final ArtworkResultRepository artworkResultRepository;

    @Autowired
    private final StudentRepository studentRepository;

    @Override
    public List<ArtworkDto> getAll() {
        List<Artwork> artworkList = artworkRepository.findAll();
        return ArtworkMapper.toDtoList(artworkList);
    }

    @Override
    public List<Artwork> getByType(int type) {
        return artworkRepository.findByArtworkType(type);
    }

    @Override
    public ArtworkDto getById(int id) {
        Optional<Artwork> artwork = artworkRepository.findById(id);

        return artwork.map(ArtworkMapper::toDto).orElse(null);
    }

    @Override
    public List<ArtworkResultDto> getResultByGroupId(int groupId) {
        List<ArtworkResult> artworkResultList = artworkResultRepository.findByStudentGroupId(groupId);
        return ArtworkResultMapper.toDtoList(artworkResultList);
    }

    @Override
    public List<ArtworkResultDto> getResultByStudentId(int studentId) {
//        return artworkResultRepository.findByStudentId(studentId);
        List<ArtworkResult> artworkResultList = artworkResultRepository.findByStudentId(studentId);
        return ArtworkResultMapper.toDtoList(artworkResultList);
    }

    @Override
    public void saveResult(int artworckId, int studentId, String imageUrl) {
        // Artwork 엔터티 가져오기
        Artwork artwork = artworkRepository.findById(artworckId).orElseThrow(() -> new EntityNotFoundException("Artwork not found"));

        // Student 엔터티 가져오기
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new EntityNotFoundException("Student not found"));

        ArtworkResult artworkResult = new ArtworkResult();
        artworkResult.setArtwork(artwork);
        artworkResult.setStudent(student);
        artworkResult.setArtworkResultImageUrl(imageUrl);

        artworkResultRepository.save(artworkResult);
    }
}
