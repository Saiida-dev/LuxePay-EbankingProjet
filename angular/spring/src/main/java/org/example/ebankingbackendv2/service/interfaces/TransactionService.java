package org.example.ebankingbackendv2.service.interfaces;

import org.example.ebankingbackendv2.dto.RechargeRequestDTO;
import org.example.ebankingbackendv2.dto.VirementRequestDTO;
import org.example.ebankingbackendv2.entity.Transaction;

import java.util.List;

public interface TransactionService {
    Transaction effectuerVirement(VirementRequestDTO dto);
    List<Transaction> getAllTransactions();

    public List<Transaction> getHistoriqueClient(Long clientId) ;



}
