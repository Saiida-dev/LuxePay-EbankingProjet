package org.example.ebankingbackendv2.service.implementations;

import org.example.ebankingbackendv2.dto.RechargeRequestDTO;
import org.example.ebankingbackendv2.dto.VirementRequestDTO;
import org.example.ebankingbackendv2.entity.Compte;
import org.example.ebankingbackendv2.entity.Transaction;
import org.example.ebankingbackendv2.entity.TransactionType;
import org.example.ebankingbackendv2.repository.CompteRepository;
import org.example.ebankingbackendv2.repository.TransactionRepository;
import org.example.ebankingbackendv2.service.interfaces.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CompteRepository compteRepository;

    @Override
    @Transactional
    public Transaction effectuerVirement(VirementRequestDTO dto) {
        // 1. Vérifier que les comptes existent
        Compte source = compteRepository.findById(dto.getCompteSourceId())
                .orElseThrow(() -> new RuntimeException("Compte source introuvable"));
        Compte destination = compteRepository.findById(dto.getCompteDestinationId())
                .orElseThrow(() -> new RuntimeException("Compte destination introuvable"));

        // 2. Vérifier solde suffisant
        if (source.getSolde().compareTo(dto.getMontant()) < 0) {
            throw new RuntimeException("Solde insuffisant pour le virement.");
        }

        // 3. Mettre à jour les soldes
        source.setSolde(source.getSolde().subtract(dto.getMontant()));
        destination.setSolde(destination.getSolde().add(dto.getMontant()));

        compteRepository.save(source);
        compteRepository.save(destination);

        // 4. Enregistrer la transaction
        Transaction transaction = Transaction.builder()
                .compteSource(source)
                .compteDestination(destination)
                .montant(dto.getMontant())
                .dateTransaction(LocalDateTime.now())
                .type(TransactionType.VIREMENT)
                .description(dto.getDescription())
                .build();

        return transactionRepository.save(transaction);
    }




    public List<Transaction> getHistoriqueClient(Long clientId) {
        return transactionRepository.findByClientId(clientId);
    }


    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }



}
