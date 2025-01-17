package com.biblioteca.book_service.dto;

import lombok.Data;

@Data
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private String categoryName;
    private boolean available;
    private Integer availableQuantity; // Cantidad disponible para reservas
}