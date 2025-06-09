package org.example.ebankingbackendv2.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.ebankingbackendv2.entity.Client;
import org.example.ebankingbackendv2.entity.Compte;
import org.example.ebankingbackendv2.entity.TypeCompte;
import org.example.ebankingbackendv2.entity.Utilisateur;
import org.example.ebankingbackendv2.repository.ClientRepository;
import org.example.ebankingbackendv2.repository.CompteRepository;
import org.example.ebankingbackendv2.repository.UtilisateurRepository;
import org.example.ebankingbackendv2.service.interfaces.UtilisateurService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final CompteRepository compteRepository;  // à ajouter

    @Override
    public void save(Utilisateur utilisateur) {
        // 1. Sauvegarde de l'utilisateur
        Utilisateur savedUtilisateur = utilisateurRepository.save(utilisateur);

        // 2. Création automatique d'un compte lié à cet utilisateur
        Compte compte = Compte.builder()
                .numero(genererNumeroUnique())
                .solde(new BigDecimal("100000.00")) // solde élevé
                .type(TypeCompte.COURANT) // à adapter selon ton enum
                .utilisateur(savedUtilisateur)
                .build();

        // 3. Sauvegarde du compte
        compteRepository.save(compte);
    }


    private String genererNumeroUnique() {
        long timestamp = System.currentTimeMillis();
        int random = (int) (Math.random() * 9000) + 1000; // 4 chiffres aléatoires
        return "ACC" + timestamp + random;
    }

    @Override
    public Optional<Utilisateur> findByUsername(String username) {
        return utilisateurRepository.findByUsername(username);
    }
}

