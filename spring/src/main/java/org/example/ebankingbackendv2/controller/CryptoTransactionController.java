package org.example.ebankingbackendv2.controller;

import lombok.RequiredArgsConstructor;
import org.example.ebankingbackendv2.dto.CryptoTransactionRequestDto;
import org.example.ebankingbackendv2.dto.CryptoTransactionResponseDto;
import org.example.ebankingbackendv2.service.interfaces.CryptoTransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crypto")
@RequiredArgsConstructor
public class CryptoTransactionController {

    private final CryptoTransactionService transactionService;

    @PostMapping("/transaction")
    public CryptoTransactionResponseDto makeTransaction(@RequestBody CryptoTransactionRequestDto requestDto) {
        return transactionService.makeTransaction(requestDto);
    }
    @GetMapping("/test")
    public String test() {
        return "Server is up";
    }


    @GetMapping("/transactions/{walletId}")
    public List<CryptoTransactionResponseDto> getTransactions(@PathVariable Long walletId) {
        return transactionService.getTransactionsByWalletId(walletId);
    }
}
