package org.example.ebankingbackendv2.service.interfaces;

import org.example.ebankingbackendv2.entity.Utilisateur;

import java.util.List;
import java.util.Optional;

public interface UtilisateurService {
    void save(Utilisateur utilisateur);
    Optional<Utilisateur> findByUsername(String username);
}
