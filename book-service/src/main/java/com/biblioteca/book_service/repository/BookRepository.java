package com.biblioteca.book_service.repository;

import com.biblioteca.book_service.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // Buscar por ISBN
    Optional<Book> findByIsbn(String isbn);

    // Buscar por título (ignorando mayúsculas/minúsculas)
    List<Book> findByTitleContainingIgnoreCase(String title);

    // Buscar por autor (ignorando mayúsculas/minúsculas)
    List<Book> findByAuthorContainingIgnoreCase(String author);

    // Filtros dinámicos (categoría, estado, rango de años)
    @Query("SELECT b FROM Book b WHERE " +
            "(:category IS NULL OR b.category = :category) AND " +
            "(:status IS NULL OR (b.quantity > 0 AND :status = 'Disponible') OR (b.quantity = 0 AND :status = 'Prestado')) AND " +
            "(:yearFrom IS NULL OR b.year >= :yearFrom) AND " +
            "(:yearTo IS NULL OR b.year <= :yearTo)")
    List<Book> filterBooks(String category, String status, Integer yearFrom, Integer yearTo);
}
