package org.example.ebankingbackendv2.controller;

import org.example.ebankingbackendv2.dto.OtpRequest;
import org.example.ebankingbackendv2.dto.SmsRequest;
import org.example.ebankingbackendv2.service.interfaces.SmsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sms") // Ajout d’un préfixe clair pour les routes API
@CrossOrigin(origins = "*") // Permet les appels depuis Angular
public class SmsController {

    @Autowired
    private SmsService smsService;

    @PostMapping("/send")
    public ResponseEntity<String> sendSms(@RequestBody SmsRequest request) {
        if (request.getNumero() == null || request.getMessage() == null) {
            return ResponseEntity.badRequest().body("⚠️ Le numéro ou le message est manquant.");
        }
        smsService.sendSms(request.getNumero(), request.getMessage());
        return ResponseEntity.ok("✅ SMS envoyé à " + request.getNumero());
    }

    @PostMapping("/otp")
    public ResponseEntity<String> sendOtp(@RequestBody OtpRequest request) {
        if (request.getNumero() == null) {
            return ResponseEntity.badRequest().body("⚠️ Le numéro est requis.");
        }

        String code = String.valueOf((int) (Math.random() * 900000 + 100000)); // Code OTP 6 chiffres
        smsService.envoyerCodeVerification(request.getNumero(), code);
        return ResponseEntity.ok("✅ Code OTP envoyé à " + request.getNumero() + " : " + code);
    }
}
