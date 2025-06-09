package org.example.ebankingbackendv2.dto;

import lombok.Data;
import org.example.ebankingbackendv2.entity.RechargeType;
import java.math.BigDecimal;

@Data
public class RechargeRequestDTO {
    private String operateur;
    private RechargeType type;  // Bien enum
    private String numero;
    private BigDecimal montant;

    // Champs spécifiques pour certains types
    private String codeContrat;  // pour ELECTRICITY
    private String email;        // pour NETFLIX, SPOTIFY
    private String identifiant;  // pour NETFLIX
}
