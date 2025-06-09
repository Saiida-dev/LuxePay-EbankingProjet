package org.example.ebankingbackendv2.service.implementations;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.ebankingbackendv2.dto.RechargeRequestDTO;
import org.example.ebankingbackendv2.dto.RechargeResponseDTO;
import org.example.ebankingbackendv2.entity.Compte;
import org.example.ebankingbackendv2.entity.Recharge;
import org.example.ebankingbackendv2.entity.RechargeType;
import org.example.ebankingbackendv2.repository.CompteRepository;
import org.example.ebankingbackendv2.repository.RechargeRepository;
import org.example.ebankingbackendv2.service.interfaces.RechargeService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RechargeServiceImpl implements RechargeService {

    private final CompteRepository compteRepository;
    private final RechargeRepository rechargeRepository;

    @Override
    @Transactional
    public Recharge effectuerRecharge(Long compteId, RechargeRequestDTO dto) {
        Compte compte = compteRepository.findById(compteId)
                .orElseThrow(() -> new IllegalArgumentException("Compte non trouvé"));

        if (compte.getSolde().compareTo(dto.getMontant()) < 0) {
            throw new IllegalArgumentException("Solde insuffisant !");
        }

        compte.setSolde(compte.getSolde().subtract(dto.getMontant()));
        compteRepository.save(compte);

        Recharge recharge = new Recharge();
        recharge.setCompte(compte);
        recharge.setDateRecharge(LocalDateTime.now());
        recharge.setMontant(dto.getMontant());
        recharge.setOperateur(dto.getOperateur());
        recharge.setNumero(dto.getNumero());
        recharge.setType(dto.getType());

        return rechargeRepository.save(recharge);
    }

    @Override
    public List<RechargeResponseDTO> getRechargesByCompte(Long compteId) {
        List<Recharge> recharges = rechargeRepository.findByCompteId(compteId);

        return recharges.stream().map(recharge -> {
            RechargeResponseDTO dto = new RechargeResponseDTO();
            dto.setId(recharge.getId());
            dto.setMontant(recharge.getMontant());
            dto.setOperateur(recharge.getOperateur());
            dto.setNumero(recharge.getNumero());
            dto.setType(recharge.getType());
            dto.setDateRecharge(recharge.getDateRecharge());
            dto.setCompteNumero(recharge.getCompte().getNumero()); // évite de renvoyer tout l'objet compte
            return dto;
        }).toList();
    }

}
