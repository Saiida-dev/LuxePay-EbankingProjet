package org.example.ebankingbackendv2.controller;

import org.example.ebankingbackendv2.dto.RechargeRequestDTO;
import org.example.ebankingbackendv2.dto.VirementRequestDTO;
import org.example.ebankingbackendv2.entity.Transaction;
import org.example.ebankingbackendv2.service.interfaces.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*") //Pour accepter les requêtes du frontend
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public Transaction effectuerVirement(@RequestBody VirementRequestDTO dto) {
        return transactionService.effectuerVirement(dto);
    }



    @GetMapping("/clients/{clientId}/transactions")
    public List<Transaction> getTransactionsByClient(@PathVariable("clientId") Long clientId) {
        return transactionService.getHistoriqueClient(clientId);
    }



    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }
}
