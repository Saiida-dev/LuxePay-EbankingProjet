package org.example.ebankingbackendv2.dto;

import lombok.Data;
import org.example.ebankingbackendv2.entity.TypeCompte;

import java.math.BigDecimal;

@Data
public class CompteRequestDTO {
    private TypeCompte type;          // Exemple : COURANT, EPARGNE, etc.
    private BigDecimal soldeInitial;  // Exemple : 500.00
}
