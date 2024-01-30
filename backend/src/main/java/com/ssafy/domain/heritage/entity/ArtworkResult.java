package com.ssafy.domain.heritage.entity;

import com.ssafy.domain.classroom.entity.Student;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "artwork_result")
@Getter
@Setter
@NoArgsConstructor
public class ArtworkResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artwork_result_id")
    int artworkResultId;

    @Column(name = "artwork_result_create_time")
    Timestamp artworkResultCreateTime;

    @Column(name = "artwork_result_image_url")
    String artworkResultImageUrl;

    @ManyToOne
    @JoinColumn(name = "artwork_id", nullable = false)
    private Artwork artwork;
    
    //학생 컬럼 추가해야함
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}
