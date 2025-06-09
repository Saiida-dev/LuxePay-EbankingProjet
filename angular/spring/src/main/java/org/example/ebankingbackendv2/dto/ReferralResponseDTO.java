package org.example.ebankingbackendv2.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReferralResponseDTO {
    private Long id;
    private String referralCode;
    private String status;
    private double gain;
    private LocalDateTime inscriptionDate;
}