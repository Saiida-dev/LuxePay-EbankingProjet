package org.example.ebankingbackendv2.service.interfaces;

import org.example.ebankingbackendv2.dto.CryptoTransactionRequestDto;
import org.example.ebankingbackendv2.dto.CryptoTransactionResponseDto;

import java.util.List;

public interface CryptoTransactionService {
    CryptoTransactionResponseDto makeTransaction(CryptoTransactionRequestDto requestDto);
    List<CryptoTransactionResponseDto> getTransactionsByWalletId(Long walletId);
}
