package org.example.ebankingbackendv2.repository;

import org.example.ebankingbackendv2.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t FROM Transaction t " +
            "WHERE t.compteSource.client.id = :clientId " +
            "OR t.compteDestination.client.id = :clientId " +
            "ORDER BY t.dateTransaction DESC")
    List<Transaction> findByClientId(@Param("clientId") Long clientId);

}
