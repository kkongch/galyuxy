package com.ssafy.domain.presentation.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "filter")
public class ARFilter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ar_filter_id")
    Integer arFilterId;

    @Column(name = "ar_filter_name")
    String arFilterName;

    @Column(name = "ar_filter_type")
    String arFilterType;

    @Column(name = "ar_filter_url")
    String arFilterUrl;
}
