import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [newBook, setNewBook] = useState(false);
    const [filters, setFilters] = useState({ category: '', status: '', yearFrom: '', yearTo: '' });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleFilter = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/books/filter', {
                params: filters
            });
            setBooks(response.data);
        } catch (error) {
            console.error('Error filtering books:', error);
        }
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/api/books/${editingBook.id}`, editingBook);
            setEditingBook(null);
            fetchBooks();
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleRegister = async (book) => {
        try {
            await axios.post('http://localhost:8080/api/books', book);
            setNewBook(false);
            fetchBooks();
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Gestión de Libros</h2>
            {newBook ? (
                <Modal show={newBook} onHide={() => setNewBook(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registrar Libro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => { e.preventDefault(); handleRegister(editingBook); }}>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" placeholder="Título" onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formAuthor">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control type="text" placeholder="Autor" onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formCategory">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control type="text" placeholder="Categoría" onChange={(e) => setEditingBook({ ...editingBook, category: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formQuantity">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control type="number" placeholder="Cantidad" onChange={(e) => setEditingBook({ ...editingBook, quantity: e.target.value })} />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">
                                Guardar
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            ) : (
                <div>
                    <Button className="mb-3" onClick={() => setNewBook(true)}>Registrar Libro</Button>
                    <InputGroup className="mb-3">
                    <Form.Select
                        aria-label="Categoría"
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value="">Seleccionar Categoría</option>
                        <option value="Ficción">Ficción</option>
                        <option value="Ciencia">Ciencia</option>
                        <option value="Historia">Historia</option>
                        <option value="Tecnología">Tecnología</option>
                    </Form.Select>

                    <Form.Select
                        aria-label="Estado"
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                        <option value="">Seleccionar Estado</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Prestado">Prestado</option>
                    </Form.Select>

                    <Button variant="outline-primary" onClick={handleFilter}>
                        Filtrar
                    </Button>
                </InputGroup>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Categoría</th>
                                <th>Disponibilidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>{book.quantity > 0 ? 'Disponible' : 'Prestado'}</td>
                                    <td>
                                        <Button variant="warning" className="me-2" onClick={() => setEditingBook(book)}>Editar</Button>
                                        <Button variant="danger" onClick={() => handleDelete(book.id)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {editingBook && (
                        <Modal show={!!editingBook} onHide={() => setEditingBook(null)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Editar Libro</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                                    <Form.Group controlId="formEditTitle">
                                        <Form.Label>Título</Form.Label>
                                        <Form.Control type="text" value={editingBook.title} onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group controlId="formEditAuthor">
                                        <Form.Label>Autor</Form.Label>
                                        <Form.Control type="text" value={editingBook.author} onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="mt-3">
                                        Guardar
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    )}
                </div>
            )}
        </div>
    );
};

export default BooksPage;
