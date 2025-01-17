package com.biblioteca.user_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Deshabilitar CSRF para pruebas locales
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/login").permitAll() // Permitir acceso al endpoint de login
                .anyRequest().authenticated() // Proteger todas las demás rutas
            )
            .cors(cors -> {}); // Habilitar CORS (ya configurado en CorsConfig)

        return http.build();
    }
}
