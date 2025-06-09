package org.example.ebankingbackendv2.service.interfaces;

import org.example.ebankingbackendv2.dto.RechargeRequestDTO;
import org.example.ebankingbackendv2.dto.RechargeResponseDTO;
import org.example.ebankingbackendv2.entity.Recharge;

import java.util.List;

public interface RechargeService {
    Recharge effectuerRecharge(Long compteId, RechargeRequestDTO dto);
    List<RechargeResponseDTO> getRechargesByCompte(Long compteId);

}
