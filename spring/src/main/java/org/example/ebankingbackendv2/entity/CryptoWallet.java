package org.example.ebankingbackendv2.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.ebankingbackendv2.enum_.CryptoType;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CryptoWallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double balance;

    @Enumerated(EnumType.STRING)
    private CryptoType cryptoType;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
}
