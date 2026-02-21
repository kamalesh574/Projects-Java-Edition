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

        Map<String, Object> response = new HashMap<>();

        response.put("username", authentication.getName());
        response.put("role", authentication.getAuthorities()
                .stream()
                .findFirst()
                .get()
                .getAuthority()
                .replace("ROLE_", ""));

        return response;
    }
}