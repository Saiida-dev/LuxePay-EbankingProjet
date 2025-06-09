package org.example.ebankingbackendv2.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.ebankingbackendv2.dto.ReferralRequestDTO;
import org.example.ebankingbackendv2.dto.ReferralResponseDTO;
import org.example.ebankingbackendv2.entity.Client;
import org.example.ebankingbackendv2.entity.Referral;
import org.example.ebankingbackendv2.enum_.ReferralStatus;
import org.example.ebankingbackendv2.repository.ClientRepository;
import org.example.ebankingbackendv2.repository.ReferralRepository;
import org.example.ebankingbackendv2.service.interfaces.ReferralService;
import org.example.ebankingbackendv2.utils.ReferralCodeGenerator;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReferralServiceImpl implements ReferralService {

    private final ReferralRepository referralRepository;
    private final ClientRepository clientRepository;

    @Override
    public ReferralResponseDTO createReferral(ReferralRequestDTO request) {
        Client parrain = clientRepository.findById(request.getParrainId())
                .orElseThrow(() -> new RuntimeException("Parrain introuvable"));
        Client filleul = clientRepository.findById(request.getFilleulId())
                .orElseThrow(() -> new RuntimeException("Filleul introuvable"));

        String code = generateUniqueReferralCode(request.getPrefix());

        Referral referral = Referral.builder()
                .referralCode(code)
                .gain(0)
                .status(ReferralStatus.EN_ATTENTE)
                .inscriptionDate(LocalDateTime.now())
                .parrain(parrain)
                .filleul(filleul)
                .build();

        Referral saved = referralRepository.save(referral);
        return toDto(saved);
    }

    @Override
    public List<ReferralResponseDTO> getReferralsByParrainId(Long parrainId) {
        return referralRepository.findByParrainId(parrainId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public double getTotalGains(Long parrainId) {
        return referralRepository.findByParrainId(parrainId).stream()
                .filter(r -> r.getStatus() == ReferralStatus.ACTIF)
                .mapToDouble(Referral::getGain)
                .sum();
    }

    @Override
    public int getTotalFilleuls(Long parrainId) {
        return referralRepository.findByParrainId(parrainId).size();
    }

    private String generateUniqueReferralCode(String prefix) {
        String code;
        do {
            code = ReferralCodeGenerator.generateReferralCode(prefix);
        } while (referralRepository.existsByReferralCode(code));
        return code;
    }

    private ReferralResponseDTO toDto(Referral referral) {
        ReferralResponseDTO dto = new ReferralResponseDTO();
        dto.setId(referral.getId());
        dto.setReferralCode(referral.getReferralCode());
        dto.setStatus(referral.getStatus().name());
        dto.setGain(referral.getGain());
        dto.setInscriptionDate(referral.getInscriptionDate());
        return dto;
    }
}