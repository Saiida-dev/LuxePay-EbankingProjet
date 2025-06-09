package org.example.ebankingbackendv2.controller;

import lombok.RequiredArgsConstructor;
import org.example.ebankingbackendv2.dto.RechargeRequestDTO;
import org.example.ebankingbackendv2.dto.RechargeResponseDTO;
import org.example.ebankingbackendv2.entity.Recharge;
import org.example.ebankingbackendv2.service.interfaces.RechargeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recharges")
@RequiredArgsConstructor
public class RechargeController {

    private final RechargeService rechargeService;

    @PostMapping("/{compteId}")
    public ResponseEntity<Recharge> effectuerRecharge(
            @PathVariable("compteId") Long compteId,
            @RequestBody RechargeRequestDTO request
    ) {
        Recharge recharge = rechargeService.effectuerRecharge(compteId, request);
        return ResponseEntity.ok(recharge);
    }

    @GetMapping("/{compteId}/recharges")
    public ResponseEntity<List<RechargeResponseDTO>> getRechargesByCompte(@PathVariable("compteId") Long compteId) {
        List<RechargeResponseDTO> recharges = rechargeService.getRechargesByCompte(compteId);
        return ResponseEntity.ok(recharges);
    }


}
