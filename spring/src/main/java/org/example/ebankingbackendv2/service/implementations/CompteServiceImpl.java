package org.example.ebankingbackendv2.service.implementations;

import org.example.ebankingbackendv2.dto.CompteRequestDTO;
import org.example.ebankingbackendv2.entity.Compte;
import org.example.ebankingbackendv2.entity.Utilisateur;
import org.example.ebankingbackendv2.repository.CompteRepository;
import org.example.ebankingbackendv2.repository.UtilisateurRepository;
import org.example.ebankingbackendv2.service.interfaces.CompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CompteServiceImpl implements CompteService {

    @Autowired
    private CompteRepository compteRepository;
    private UtilisateurRepository utilisateurRepository;

    @Override
    public List<Compte> getAllComptes() {
        return compteRepository.findAll();
    }

    @Override
    public Compte getCompteById(Long id) {
        return compteRepository.findById(id).orElse(null);
    }

    @Override
    public Compte createCompte(Compte compte) {
        return compteRepository.save(compte);
    }

    @Override
    public Compte updateCompte(Long id, Compte compte) {
        Compte existing = compteRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setNumero(compte.getNumero());
            existing.setSolde(compte.getSolde());
            existing.setType(compte.getType());
            existing.setClient(compte.getClient());
            existing.setUtilisateur(compte.getUtilisateur());
            return compteRepository.save(existing);
        }
        return null;
    }



    private String genererNumeroUnique() {
        // Exemple : Numéro de compte basé sur timestamp + 4 chiffres aléatoires
        long timestamp = System.currentTimeMillis();
        int random = (int)(Math.random() * 9000) + 1000; // Nombre entre 1000 et 9999
        return "ACC" + timestamp + random;
    }


    public Compte createComptePourUtilisateur(Long utilisateurId, CompteRequestDTO dto) {

        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Compte compte = new Compte();
        compte.setUtilisateur(utilisateur);
        compte.setNumero(genererNumeroUnique());
        compte.setType(dto.getType());
        compte.setSolde(dto.getSoldeInitial());
        compte.setClient(null); // Si tu n’utilises plus Client


        return compteRepository.save(compte);
    }


    @Override
    public void deleteCompte(Long id) {
        compteRepository.deleteById(id);
    }
}
