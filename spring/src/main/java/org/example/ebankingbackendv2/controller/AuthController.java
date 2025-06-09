package org.example.ebankingbackendv2.controller;

import lombok.RequiredArgsConstructor;
import org.example.ebankingbackendv2.dto.JwtResponse;
import org.example.ebankingbackendv2.dto.LoginRequestDTO;
import org.example.ebankingbackendv2.dto.RegisterRequestDTO;
import org.example.ebankingbackendv2.entity.Utilisateur;
import org.example.ebankingbackendv2.service.interfaces.AuthService;
import org.example.ebankingbackendv2.service.interfaces.SmsService;
import org.example.ebankingbackendv2.service.interfaces.UtilisateurService;
import org.example.ebankingbackendv2.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UtilisateurService utilisateurService;
    private final SmsService smsService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());

            Authentication auth = authenticationManager.authenticate(authToken);

            Utilisateur utilisateur = utilisateurService.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            String jwt = JwtUtil.generateToken(utilisateur.getUsername(), utilisateur.getRoles());

            return ResponseEntity.ok(new JwtResponse(jwt));

        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nom d'utilisateur ou mot de passe invalide");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO request) {
        try {
            authService.register(request); // ✅ toute la logique déplacée dans le service
            return ResponseEntity.ok("Utilisateur enregistré avec succès.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'inscription");
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyCode(@RequestParam String username, @RequestParam String code) {
        Optional<Utilisateur> OptionalUtilisateur = utilisateurService.findByUsername(username);
        if (OptionalUtilisateur.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        }

        Utilisateur utilisateur = OptionalUtilisateur.get();
        if (utilisateur.getCodeVerification().equals(code)) {
            utilisateur.setEnabled(true);
            utilisateur.setVerifie(true);
            utilisateur.setCodeVerification(null);
            utilisateurService.save(utilisateur);
            return ResponseEntity.ok("Vérification réussie. Compte activé.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Code incorrect");
        }
    }
}
