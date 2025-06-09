package org.example.ebankingbackendv2.dto;

import lombok.Data;
import org.example.ebankingbackendv2.entity.RechargeType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class RechargeResponseDTO {
    private Long id;
    private BigDecimal montant;
    private String operateur;
    private String numero;
    private RechargeType type;
    private LocalDateTime dateRecharge;
    private String compteNumero;
}
