package org.example.ebankingbackendv2.service.interfaces;

import org.example.ebankingbackendv2.entity.Compte;

import java.util.List;

public interface CompteService {
    List<Compte> getAllComptes();
    Compte getCompteById(Long id);
    Compte createCompte(Compte compte);
    Compte updateCompte(Long id, Compte compte);
    void deleteCompte(Long id);
}
