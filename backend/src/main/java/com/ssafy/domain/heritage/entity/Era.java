package com.ssafy.domain.heritage.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "era")
public class Era  {

    Integer eraId;
    String eraName;
    String eraCountry;
}
