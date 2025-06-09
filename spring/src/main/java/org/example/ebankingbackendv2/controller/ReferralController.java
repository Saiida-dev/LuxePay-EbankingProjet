package org.example.ebankingbackendv2.controller;

import lombok.RequiredArgsConstructor;
import org.example.ebankingbackendv2.dto.ReferralRequestDTO;
import org.example.ebankingbackendv2.dto.ReferralResponseDTO;
import org.example.ebankingbackendv2.service.interfaces.ReferralService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/referrals")
@RequiredArgsConstructor
public class ReferralController {

    private final ReferralService referralService;

    @PostMapping("/create")
    public ResponseEntity<ReferralResponseDTO> createReferral(@RequestBody ReferralRequestDTO request) {
        return ResponseEntity.ok(referralService.createReferral(request));
    }

    @GetMapping("/parrain/{parrainId}")
    public ResponseEntity<List<ReferralResponseDTO>> getReferralsByParrain(@PathVariable Long parrainId) {
        return ResponseEntity.ok(referralService.getReferralsByParrainId(parrainId));
    }

    @GetMapping("/parrain/{parrainId}/gains")
    public ResponseEntity<Double> getTotalGains(@PathVariable Long parrainId) {
        return ResponseEntity.ok(referralService.getTotalGains(parrainId));
    }

    @GetMapping("/parrain/{parrainId}/total")
    public ResponseEntity<Integer> getTotalFilleuls(@PathVariable Long parrainId) {
        return ResponseEntity.ok(referralService.getTotalFilleuls(parrainId));
    }
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("ReferralController actif");
    }

}
