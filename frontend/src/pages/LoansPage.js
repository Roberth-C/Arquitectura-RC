import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Table, Container, Row, Col } from "react-bootstrap";

const LoansPage = () => {
  const [loans, setLoans] = useState([]);
  const [newLoan, setNewLoan] = useState({ bookId: "", userId: "", dueDate: "" });
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [filterType, setFilterType] = useState(""); // "user" or "book"
  const [history, setHistory] = useState([]);
  const [activeLoans, setActiveLoans] = useState([]);

  useEffect(() => {
    fetchActiveLoans();
  }, []);

  const fetchActiveLoans = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/loans/active");
      setActiveLoans(response.data);
    } catch (error) {
      console.error("Error fetching active loans:", error);
    }
  };

  const registerLoan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/loans", newLoan);
      alert("Préstamo registrado con éxito");
      fetchActiveLoans();
      setNewLoan({ bookId: "", userId: "", dueDate: "" });
    } catch (error) {
      console.error("Error registering loan:", error);
    }
  };

  const returnBook = async (loanId) => {
    try {
      await axios.put(`http://localhost:8080/api/loans/${loanId}/return`);
      alert("Devolución registrada con éxito");
      fetchActiveLoans();
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const endpoint =
        filterType === "user"
          ? `http://localhost:8080/api/loans/history/user/${userId}`
          : `http://localhost:8080/api/loans/history/book/${bookId}`;
      const response = await axios.get(endpoint);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Gestión de Préstamos</h2>

      {/* Registrar Préstamo */}
      <Row className="mb-4">
        <Col>
          <h3>Registrar Préstamo</h3>
          <Form onSubmit={registerLoan}>
            <Form.Group className="mb-3">
              <Form.Label>ID del Libro</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID del Libro"
                value={newLoan.bookId}
                onChange={(e) => setNewLoan({ ...newLoan, bookId: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID del Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID del Usuario"
                value={newLoan.userId}
                onChange={(e) => setNewLoan({ ...newLoan, userId: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Devolución</Form.Label>
              <Form.Control
                type="date"
                value={newLoan.dueDate}
                onChange={(e) => setNewLoan({ ...newLoan, dueDate: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Registrar
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Visualizar Préstamos Activos */}
      <Row className="mb-4">
        <Col>
          <h3>Préstamos Activos</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID del Libro</th>
                <th>ID del Usuario</th>
                <th>Fecha de Préstamo</th>
                <th>Fecha de Devolución</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {activeLoans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.bookId}</td>
                  <td>{loan.userId}</td>
                  <td>{loan.loanDate}</td>
                  <td>{loan.dueDate}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => returnBook(loan.id)}
                    >
                      Registrar Devolución
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Historial de Préstamos */}
      <Row>
        <Col>
          <h3>Historial de Préstamos</h3>
          <Form className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Filtrar por:</Form.Label>
              <Form.Select
                onChange={(e) => setFilterType(e.target.value)}
                value={filterType}
              >
                <option value="">Seleccionar Filtro</option>
                <option value="user">Por Usuario</option>
                <option value="book">Por Libro</option>
              </Form.Select>
            </Form.Group>
            {filterType === "user" && (
              <Form.Group className="mb-3">
                <Form.Label>ID del Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ID del Usuario"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </Form.Group>
            )}
            {filterType === "book" && (
              <Form.Group className="mb-3">
                <Form.Label>ID del Libro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ID del Libro"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                />
              </Form.Group>
            )}
            <Button variant="primary" onClick={fetchHistory}>
              Buscar
            </Button>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID del Libro</th>
                <th>ID del Usuario</th>
                <th>Fecha de Préstamo</th>
                <th>Fecha de Devolución</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {history.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.bookId}</td>
                  <td>{loan.userId}</td>
                  <td>{loan.loanDate}</td>
                  <td>{loan.dueDate}</td>
                  <td>{loan.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default LoansPage;
