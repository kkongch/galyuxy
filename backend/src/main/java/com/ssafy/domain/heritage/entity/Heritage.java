package com.ssafy.domain.heritage.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Heritage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "heritage_id")
    private Integer heritageId;


    @Column(name = "heritage_name" )
    private String heritageName;

    @Column(name = "heritage_content" )
    private String heritageContent;

    @Column(name = "heritage_image_url")
            private String heritageImageUrl;

    @Column(name = "heritage_3d_image_url")
    private String heritage3dImageUrl;

    @ManyToOne
    @JoinColumn(name = "era_id", nullable = false)
    private Era era;


    public Heritage(String heritageName, String heritageContent){
        this.heritageName = heritageName;
        this.heritageContent = heritageContent;
    }
}
