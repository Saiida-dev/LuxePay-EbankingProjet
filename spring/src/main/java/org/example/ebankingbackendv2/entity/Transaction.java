package org.example.ebankingbackendv2.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal montant;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateTransaction;


    @Enumerated(EnumType.STRING)
    private TransactionType type;

    private String description;

    // Virement : compte source
    @ManyToOne
    @JoinColumn(name = "compte_source_id")
    @JsonIgnore
    private Compte compteSource;

    // Virement : compte destination
    @ManyToOne
    @JoinColumn(name = "compte_destination_id")
    @JsonIgnore
    private Compte compteDestination;
}
