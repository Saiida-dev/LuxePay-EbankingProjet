package org.example.ebankingbackendv2.repository;

import org.example.ebankingbackendv2.entity.CryptoTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CryptoTransactionRepository extends JpaRepository<CryptoTransaction, Long> {
    List<CryptoTransaction> findByWalletId(Long walletId);
}
