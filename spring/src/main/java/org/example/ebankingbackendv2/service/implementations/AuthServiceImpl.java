package org.example.ebankingbackendv2.service.implementations;

import lombok.RequiredArgsConstructor;
import org.example.ebankingbackendv2.dto.RegisterRequestDTO;
import org.example.ebankingbackendv2.entity.Utilisateur;
import org.example.ebankingbackendv2.repository.UtilisateurRepository;
import org.example.ebankingbackendv2.service.interfaces.AuthService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override

    public void register(RegisterRequestDTO request) {
        Utilisateur user = Utilisateur.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .cin(request.getCin())
                .age(request.getAge())
                .telephone(request.getTelephone())
                .roles(Collections.singleton(request.getRole().name()))
                .enabled(true)
                .verifie(false) // si nécessaire
                .build();

        utilisateurRepository.save(user);
    }

}
