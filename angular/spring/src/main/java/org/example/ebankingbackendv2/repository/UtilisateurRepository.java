package org.example.ebankingbackendv2.repository;

import org.example.ebankingbackendv2.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByCin(String cin);
    Optional<Utilisateur> findByEmail(String email);


}
