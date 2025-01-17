package com.biblioteca.user_service.dto;

import lombok.Data;

@Data
public class UserRequestDTO {
    private String idInstitucional;
    private String username;
    private String password;
    private Integer role; // 1: Admin, 2: Estudiante, 3: Profesor
    private Boolean status;
}