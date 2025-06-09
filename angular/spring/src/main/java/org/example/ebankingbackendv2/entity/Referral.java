package org.example.ebankingbackendv2.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.ebankingbackendv2.enum_.ReferralStatus;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Referral {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String referralCode;

    @Enumerated(EnumType.STRING)
    private ReferralStatus status;

    private double gain;

    private LocalDateTime inscriptionDate;

    @ManyToOne
    @JoinColumn(name = "parrain_id")
    private Client parrain;

    @ManyToOne
    @JoinColumn(name = "filleul_id")
    private Client filleul;
}
