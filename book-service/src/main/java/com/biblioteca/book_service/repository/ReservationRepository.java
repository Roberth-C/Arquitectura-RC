package com.biblioteca.book_service.repository;

import com.biblioteca.book_service.entity.Book;
import com.biblioteca.book_service.entity.Reservation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // Buscar reservas activas por usuario
    List<Reservation> findByUserIdAndStatus(Long userId, String status);

    // Buscar reservas activas por libro
    List<Reservation> findByBookAndStatus(Book book, String status);
}
