package org.example.ebankingbackendv2.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.ebankingbackendv2.dto.CryptoTransactionRequestDto;
import org.example.ebankingbackendv2.dto.CryptoTransactionResponseDto;
import org.example.ebankingbackendv2.entity.CryptoTransaction;
import org.example.ebankingbackendv2.entity.CryptoWallet;
import org.example.ebankingbackendv2.enum_.CryptoTransactionType;
import org.example.ebankingbackendv2.repository.CryptoTransactionRepository;
import org.example.ebankingbackendv2.repository.CryptoWalletRepository;
import org.example.ebankingbackendv2.service.interfaces.CryptoPriceService;
import org.example.ebankingbackendv2.service.interfaces.CryptoTransactionService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CryptoTransactionServiceImpl implements CryptoTransactionService {

    private final CryptoTransactionRepository transactionRepository;
    private final CryptoWalletRepository walletRepository;
    private final CryptoPriceService cryptoPriceService; // ✅ service injecté

    @Override
    public CryptoTransactionResponseDto makeTransaction(CryptoTransactionRequestDto requestDto) {
        CryptoWallet wallet = walletRepository.findById(requestDto.getWalletId())
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        // ✅ Récupération du prix en temps réel depuis l’API externe
        double currentPrice = cryptoPriceService.getCurrentBitcoinPriceUSD();
        double amount = requestDto.getAmount();

        // ✅ Mise à jour du solde selon le type de transaction
        if (requestDto.getType() == CryptoTransactionType.BUY) {
            wallet.setBalance(wallet.getBalance() + amount);
        } else if (requestDto.getType() == CryptoTransactionType.SELL) {
            if (wallet.getBalance() < amount) {
                throw new RuntimeException("Insufficient balance to sell");
            }
            wallet.setBalance(wallet.getBalance() - amount);
        }

        // ✅ Création de la transaction
        CryptoTransaction transaction = CryptoTransaction.builder()
                .wallet(wallet)
                .amount(amount)
                .priceAtTransaction(currentPrice)
                .timestamp(LocalDateTime.now())
                .type(requestDto.getType())
                .build();

        walletRepository.save(wallet);
        CryptoTransaction saved = transactionRepository.save(transaction);

        // ✅ Construction de la réponse DTO
        return CryptoTransactionResponseDto.builder()
                .id(saved.getId())
                .cryptoType(wallet.getCryptoType())
                .amount(saved.getAmount())
                .priceAtTransaction(saved.getPriceAtTransaction())
                .timestamp(saved.getTimestamp())
                .type(saved.getType().name())
                .build();
    }

    @Override
    public List<CryptoTransactionResponseDto> getTransactionsByWalletId(Long walletId) {
        return transactionRepository.findByWalletId(walletId).stream()
                .map(tx -> CryptoTransactionResponseDto.builder()
                        .id(tx.getId())
                        .cryptoType(tx.getWallet().getCryptoType())
                        .amount(tx.getAmount())
                        .priceAtTransaction(tx.getPriceAtTransaction())
                        .timestamp(tx.getTimestamp())
                        .type(tx.getType().name())
                        .build())
                .collect(Collectors.toList());
    }
}
