package org.example.ebankingbackendv2.dto;

import lombok.Data;
import org.example.ebankingbackendv2.enum_.CryptoTransactionType;

@Data
public class CryptoTransactionRequestDto {
    private Long walletId;
    private double amount;
    private CryptoTransactionType type;
}
