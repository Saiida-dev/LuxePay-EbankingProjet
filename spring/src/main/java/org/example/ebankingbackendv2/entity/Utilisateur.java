package org.example.ebankingbackendv2.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "utilisateurs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;


    private String email;

    private String prenom;

    private String nom;

    private String password;

    private boolean enabled = true;


    private String cin;


    private int  age;

    private String telephone;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "utilisateur_roles", joinColumns = @JoinColumn(name = "utilisateur_id"))
    @Column(name = "role")
    private Set<String> roles;

    private String codeVerification;

    private boolean verifie;


    @OneToOne(mappedBy = "utilisateur", cascade = CascadeType.ALL)
    private Client client;





}