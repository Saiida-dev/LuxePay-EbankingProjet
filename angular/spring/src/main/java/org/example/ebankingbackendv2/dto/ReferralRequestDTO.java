package org.example.ebankingbackendv2.dto;

import lombok.Data;

@Data
public class ReferralRequestDTO {
    private Long parrainId;
    private Long filleulId;
    private String prefix;
}