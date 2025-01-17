package com.biblioteca.book_service.dto;

import lombok.Data;

@Data
public class CreateBookDTO {

    private String title;
    private String author;
    private String isbn;
    private Long categoryId;

}