package org.example.ebankingbackendv2.dto;

import lombok.Data;
import org.example.ebankingbackendv2.entity.Role;

@Data
public class RegisterRequestDTO {
    private String username;
    private String password;
    private String email;
    private String cin;
    private Role role;
    private int  age;
    private String telephone;
}