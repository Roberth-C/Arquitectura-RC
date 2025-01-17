// BookPage.js
import React, { useEffect, useState } from 'react';
import {
  getAllBooks,
  getBookByIsbn,
  getBooksByTitle,
  getBooksByAuthor,
  filterBooks,
  addBook,
  updateBook,
  deleteBook,
} from '../services/bookService';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookPage() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [activeTab, setActiveTab] = useState('listBooks'); // 'listBooks', 'addBook', 'editBook'
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    year: '',
    status: '',
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error al obtener los libros:', error.message);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      console.error('Error al eliminar el libro:', error.message);
    }
  };

  const handleFormSubmit = async () => {
    if (!formData.title || !formData.author || !formData.isbn) {
      alert('Título, Autor e ISBN son obligatorios.');
      return;
    }

    try {
      if (activeTab === 'addBook') {
        await addBook(formData);
      } else if (activeTab === 'editBook' && selectedBookId) {
        await updateBook(selectedBookId, formData);
      }
      fetchBooks();
      setFormData({
        title: '',
        author: '',
        isbn: '',
        category: '',
        year: '',
        status: '',
      });
      setSelectedBookId(null);
    } catch (error) {
      console.error('Error al guardar el libro:', error.message);
    }
  };

  const handleEdit = (book) => {
    setActiveTab('editBook');
    setSelectedBookId(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      year: book.year,
      status: book.status,
    });
  };

  return (
    <div className="book-page">
      <header className="header">
        <nav className="nav nav-tabs">
          <button onClick={() => setActiveTab('listBooks')} className={`nav-link ${activeTab === 'listBooks' ? 'active' : ''}`}>
            Listar Libros
          </button>
          <button onClick={() => setActiveTab('addBook')} className={`nav-link ${activeTab === 'addBook' ? 'active' : ''}`}>
            Agregar Libro
          </button>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="btn btn-danger ms-auto">
            Cerrar Sesión
          </button>
        </nav>
      </header>

      <main className="mt-4">
        {activeTab === 'listBooks' && (
          <div>
            <h1>Gestión de Libros</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>ISBN</th>
                  <th>Categoría</th>
                  <th>Año</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>{book.category}</td>
                    <td>{book.year}</td>
                    <td>{book.status}</td>
                    <td>
                      <button onClick={() => handleEdit(book)} className="btn btn-warning me-2">Editar</button>
                      <button onClick={() => handleDeleteBook(book.id)} className="btn btn-danger">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {['addBook', 'editBook'].includes(activeTab) && (
          <div>
            <h1>{activeTab === 'addBook' ? 'Agregar Libro' : 'Editar Libro'}</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Autor</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ISBN</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Categoría</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Año</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Estado</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">{activeTab === 'addBook' ? 'Agregar' : 'Guardar Cambios'}</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default BookPage;
