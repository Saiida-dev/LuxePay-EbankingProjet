package org.example.ebankingbackendv2.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class VirementRequestDTO {
    private Long compteSourceId;
    private Long compteDestinationId;
    private BigDecimal montant;
    private String description;
}
