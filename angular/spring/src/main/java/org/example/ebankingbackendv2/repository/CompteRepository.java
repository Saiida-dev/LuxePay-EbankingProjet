package org.example.ebankingbackendv2.repository;

import org.example.ebankingbackendv2.entity.Compte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompteRepository extends JpaRepository<Compte, Long> {
    Compte findByNumero(String numero);
}
