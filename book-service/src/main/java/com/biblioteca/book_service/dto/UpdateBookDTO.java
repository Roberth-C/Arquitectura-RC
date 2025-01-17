package com.biblioteca.book_service.dto;

import lombok.Data;

@Data
public class UpdateBookDTO {

    private String title;
    private String author;
    private Long categoryId;
    private boolean available;
}