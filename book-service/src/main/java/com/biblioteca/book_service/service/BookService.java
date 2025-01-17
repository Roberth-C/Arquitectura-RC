package com.biblioteca.book_service.service;

import com.biblioteca.book_service.entity.Book;
import com.biblioteca.book_service.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // Obtener todos los libros
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Buscar libro por ISBN
    public Optional<Book> getBookByIsbn(String isbn) {
        return bookRepository.findByIsbn(isbn);
    }

    // Buscar libros por título
    public List<Book> getBooksByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }

    // Buscar libros por autor
    public List<Book> getBooksByAuthor(String author) {
        return bookRepository.findByAuthorContainingIgnoreCase(author);
    }

    // Filtrar libros
    public List<Book> filterBooks(String category, String status, Integer yearFrom, Integer yearTo) {
        return bookRepository.filterBooks(category, status, yearFrom, yearTo);
    }

    // Agregar un nuevo libro
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    // Actualizar un libro existente
    public Book updateBook(Long id, Book updatedBook) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Libro no encontrado con ID: " + id));
        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setCategory(updatedBook.getCategory());
        existingBook.setQuantity(updatedBook.getQuantity());
        return bookRepository.save(existingBook);
    }

    // Eliminar un libro
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    // Reservar un libro (actualizar cantidad disponible)
    // Reservar un libro
    public boolean reserveBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Libro no encontrado con ID: " + id));
        if (book.getAvailableQuantity() > 0) {
            book.setAvailableQuantity(book.getAvailableQuantity() - 1);
            bookRepository.save(book);
            return true;
        }
        return false;
    }

    // Actualizar la cantidad disponible desde otro servicio
    public void updateAvailableQuantity(Long bookId, int change) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Libro no encontrado con ID: " + bookId));

        int newAvailableQuantity = book.getAvailableQuantity() + change;

        if (newAvailableQuantity < 0 || newAvailableQuantity > book.getQuantity()) {
            throw new IllegalArgumentException("Cantidad disponible inválida para el libro con ID: " + bookId);
        }

        book.setAvailableQuantity(newAvailableQuantity);
        bookRepository.save(book);
    }

    // Liberar un libro (para devoluciones)
    public void releaseBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Libro no encontrado con ID: " + id));
        if (book.getAvailableQuantity() < book.getQuantity()) {
            book.setAvailableQuantity(book.getAvailableQuantity() + 1);
            bookRepository.save(book);
        }
    }
}
