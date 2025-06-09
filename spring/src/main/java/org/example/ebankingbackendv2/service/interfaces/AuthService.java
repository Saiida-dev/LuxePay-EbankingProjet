package org.example.ebankingbackendv2.service.interfaces;

import org.example.ebankingbackendv2.dto.RegisterRequestDTO;

public interface AuthService {
    void register(RegisterRequestDTO request);
}
