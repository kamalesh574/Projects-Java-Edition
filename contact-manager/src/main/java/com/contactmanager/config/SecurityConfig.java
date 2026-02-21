package com.contactmanager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                .requestMatchers("/contacts/**").hasRole("ADMIN")
                .requestMatchers("/auth/me").authenticated()
                .anyRequest().authenticated()
                )
                .httpBasic();

        return http.build();
    }

    @Bean
    public UserDetailsService users() {
        return new InMemoryUserDetailsManager(
                User.withUsername("admin")
                        .password("{noop}admin123")
                        .roles("ADMIN")
                        .build(),
                User.withUsername("user")
                        .password("{noop}user123")
                        .roles("USER")
                        .build()
        );
    }
}
