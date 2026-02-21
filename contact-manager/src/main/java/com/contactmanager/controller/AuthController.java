package com.contactmanager.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/auth/me")
    public Map<String, Object> currentUser(Authentication authentication) {

        if (authentication == null) {
            throw new RuntimeException("User not authenticated");
        }

        Map<String, Object> response = new HashMap<>();

        response.put("username", authentication.getName());

        String role = authentication.getAuthorities()
                .stream()
                .findFirst()
                .map(grantedAuthority ->
                        grantedAuthority.getAuthority().replace("ROLE_", ""))
                .orElse("UNKNOWN");

        response.put("role", role);

        return response;
    }
}