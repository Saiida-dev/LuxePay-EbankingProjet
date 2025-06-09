package org.example.ebankingbackendv2.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class   Recharge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String operateur; // Exemple : Orange, Inwi, IAM

    @Enumerated(EnumType.STRING)
    private RechargeType type;      // Exemple : TELEPHONE, INTERNET, ABONNEMENT


    private String numero;

    private BigDecimal montant;

    private LocalDateTime dateRecharge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compte_id")
    private Compte compte;
}
