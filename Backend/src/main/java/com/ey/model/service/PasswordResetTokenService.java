package com.ey.model.service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class PasswordResetTokenService {

    private final Map<String, String> tokenMap = new ConcurrentHashMap<>();

    public String generateToken(String email) {
        String token = UUID.randomUUID().toString();
        tokenMap.put(email, token);
        return token;
    }

    public boolean validateToken(String email, String token) {
        return tokenMap.containsKey(email) && tokenMap.get(email).equals(token);
    }
}

