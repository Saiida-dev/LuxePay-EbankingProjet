package org.example.ebankingbackendv2.repository;

import org.example.ebankingbackendv2.entity.CryptoWallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CryptoWalletRepository extends JpaRepository<CryptoWallet, Long> {
}
