package org.example.ebankingbackendv2.service.implementations ;

import org.example.ebankingbackendv2.entity.Utilisateur;
import org.example.ebankingbackendv2.repository.UtilisateurRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    public UserDetailsServiceImpl(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Utilisateur utilisateur = utilisateurRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé : " + username));

        return User.builder()
                .username(utilisateur.getUsername())
                .password(utilisateur.getPassword()) // mot de passe déjà encodé en Bcrypt
                .roles(utilisateur.getRoles().toArray(new String[0])) // rôle sous forme String ex: "USER", "ADMIN"
                .build();
    }
}
