package com.biblioteca.loan_service.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
public class LoanDTO {
    private Long id;             // Para respuestas
    private Long bookId;         // Para solicitudes y respuestas
    private Long userId;         // Para solicitudes y respuestas
    private LocalDate loanDate;  // Para respuestas (generado automáticamente)
    private LocalDate dueDate;   // Para solicitudes y respuestas
    private LocalDate returnDate; // Para respuestas (nulo en solicitudes)
    private Double fine;         // Para respuestas (calculado automáticamente)
    private String status;
}
