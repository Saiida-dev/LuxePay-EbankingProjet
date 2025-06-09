package org.example.ebankingbackendv2.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.ebankingbackendv2.enum_.CryptoTransactionType;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CryptoTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;

    private double priceAtTransaction;

    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    private CryptoTransactionType type;

    @ManyToOne
    @JoinColumn(name = "wallet_id")
    private CryptoWallet wallet;
}
