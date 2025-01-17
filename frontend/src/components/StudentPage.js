import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentPage.css';

function StudentPage() {
  const [books, setBooks] = useState([]);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('books'); // 'books' o 'reservedBooks'
  const [userId, setUserId] = useState(5); // Simula el ID del estudiante autenticado

  useEffect(() => {
    fetchBooks();
    fetchReservedBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/books'); // URL del servicio de libros
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error al obtener los libros:', error.message);
    }
  };

  const fetchReservedBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/loans/history/user/${userId}`); // URL del historial de préstamos
      setReservedBooks(response.data);
    } catch (error) {
      console.error('Error al obtener los libros reservados:', error.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
      book.author.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleLogout = () => {
    // Eliminar la sesión del usuario (por ejemplo, localStorage)
    localStorage.clear();
    window.location.href = '/'; // Redirige a la página de inicio de sesión
  };

  const handleReserve = async (bookId) => {
    try {
      const loanData = {
        bookId,
        userId,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0], // 14 días después
      };
      await axios.post('http://localhost:8080/api/loans/reserve', loanData); // URL del servicio de préstamos
      alert('Libro reservado con éxito.');
      fetchBooks(); // Actualiza la lista de libros
      fetchReservedBooks(); // Actualiza la lista de reservados
    } catch (error) {
      console.error('Error al reservar el libro:', error.message);
      alert('No se pudo reservar el libro.');
    }
  };

  const handleReturn = async (loanId) => {
    try {
      await axios.put(`http://localhost:8080/api/loans/${loanId}/return`); // Endpoint para devolver un libro
      alert('Libro devuelto con éxito.');
      fetchBooks(); // Actualiza la lista de libros disponibles
      fetchReservedBooks(); // Actualiza la lista de reservados
    } catch (error) {
      console.error('Error al devolver el libro:', error.message);
      alert('No se pudo devolver el libro.');
    }
  };

  return (
    <div className="student-page">
      {/* Barra Superior */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar Sesión
          </button>
          <h1 className="navbar-brand m-0 mx-auto">Biblioteca - Página del Estudiante</h1>
        </div>
      </nav>

      {/* Pestañas */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'books' ? 'active' : ''}`}
            onClick={() => setActiveTab('books')}
          >
            Libros Disponibles
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'reservedBooks' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservedBooks')}
          >
            Mis Reservas
          </button>
        </li>
      </ul>

      <div className="container">
        {/* Libros Disponibles */}
        {activeTab === 'books' && (
          <>
            <div className="search-bar my-4">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por título o autor..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="row justify-content-center">
              {filteredBooks.map((book) => (
                <div key={book.id} className="col-md-4 col-lg-3 mb-4">
                  <div className="card h-100 text-center">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{book.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                      <p className="card-text">
                        <strong>Categoría:</strong> {book.category} <br />
                        <strong>Año:</strong> {book.year} <br />
                        <strong>Disponible:</strong> {book.availableQuantity} / {book.quantity}
                      </p>
                      <div className="mt-auto">
                        {book.availableQuantity > 0 ? (
                          <button
                            className="btn btn-primary w-100"
                            onClick={() => handleReserve(book.id)}
                          >
                            Reservar
                          </button>
                        ) : (
                          <button className="btn btn-secondary w-100" disabled>
                            No Disponible
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredBooks.length === 0 && (
                <div className="text-center mt-4">
                  <p>No se encontraron resultados para "{searchTerm}".</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Libros Reservados */}
        {activeTab === 'reservedBooks' && (
          <div className="table-responsive my-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Fecha de Reserva</th>
                  <th>Fecha de Vencimiento</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {reservedBooks.map((loan, index) => (
                  <tr key={loan.id}>
                    <td>{index + 1}</td>
                    <td>{loan.bookTitle}</td>
                    <td>{loan.bookAuthor}</td>
                    <td>{loan.loanDate}</td>
                    <td>{loan.dueDate}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleReturn(loan.id)}
                      >
                        Devolver
                      </button>
                    </td>
                  </tr>
                ))}
                {reservedBooks.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No tienes libros reservados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentPage;
