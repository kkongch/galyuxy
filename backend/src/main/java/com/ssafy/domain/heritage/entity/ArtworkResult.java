package com.ssafy.domain.heritage.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.domain.classroom.entity.Student;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "artwork_result")
@Getter(AccessLevel.PUBLIC)
@Setter
@ToString
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
    @JsonManagedReference
    private Artwork artwork;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonManagedReference
    private Student student;

    public ArtworkResult(int studentId, String artworkResultImageUrl) {
        this.student = new Student();
        this.student.setId(studentId);
        this.artworkResultImageUrl = artworkResultImageUrl;
    }
    public ArtworkResult(int studentId, Timestamp artworkResultCreateTime, String artworkResultImageUrl) {
        this.student = new Student();
        this.student.setId(studentId);
        this.artworkResultCreateTime = artworkResultCreateTime;
        this.artworkResultImageUrl = artworkResultImageUrl;
    }
}
