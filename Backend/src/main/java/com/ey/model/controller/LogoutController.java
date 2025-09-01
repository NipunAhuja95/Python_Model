package com.ey.model.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LogoutController {

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Clear security context (optional)
        SecurityContextHolder.clearContext();

        // Return success response
        return ResponseEntity.ok().body("Logged out successfully");
    }
}

