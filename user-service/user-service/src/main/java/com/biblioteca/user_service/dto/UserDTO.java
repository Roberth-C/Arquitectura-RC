package com.biblioteca.user_service.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String userType; // Ejemplo: ADMIN, STUDENT, TEACHER
    private Boolean status; // true = activo, false = suspendido
}
