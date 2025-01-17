package com.biblioteca.loan_service.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LoanRequestDTO {
    private Long bookId;   // ID del libro
    private Long userId;   // ID del usuario
    private LocalDate dueDate; // Fecha límite del préstamo
}
