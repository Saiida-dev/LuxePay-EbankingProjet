package org.example.ebankingbackendv2.dto;

import lombok.Builder;
import lombok.Data;
import org.example.ebankingbackendv2.enum_.CryptoType;

import java.time.LocalDateTime;


@Data
@Builder
public class CryptoTransactionResponseDto {
    private Long id;
    private CryptoType cryptoType;
    private double amount;
    private double priceAtTransaction;
    private LocalDateTime timestamp;
    private String type;
}
