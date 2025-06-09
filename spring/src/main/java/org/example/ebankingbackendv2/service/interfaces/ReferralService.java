package org.example.ebankingbackendv2.service.interfaces;

import org.example.ebankingbackendv2.dto.ReferralRequestDTO;
import org.example.ebankingbackendv2.dto.ReferralResponseDTO;

import java.util.List;

public interface ReferralService {
    ReferralResponseDTO createReferral(ReferralRequestDTO request);
    List<ReferralResponseDTO> getReferralsByParrainId(Long parrainId);
    double getTotalGains(Long parrainId);
    int getTotalFilleuls(Long parrainId);
}
