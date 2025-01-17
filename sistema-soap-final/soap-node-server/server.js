
// server.js

const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'library',
  password: 'admin1234',
  port: 5432,
});

const service = {
  LibraryService: {
    LibraryServicePort: {
      // Registrar Préstamo
      registerLoan: async (args, callback) => {
        const { userId, bookId, loanDate, dueDate } = args;
        try {
          const client = await pool.connect();
          const bookCheck = await client.query('SELECT available_copies FROM books WHERE id = $1', [bookId]);
          if (bookCheck.rows.length === 0 || bookCheck.rows[0].available_copies <= 0) {
            callback({ Fault: { faultstring: 'El libro no está disponible o no existe' } });
            return;
          }

          await client.query('BEGIN');
          const result = await client.query(
            'INSERT INTO loans (user_id, book_id, loan_date, due_date) VALUES ($1, $2, $3, $4) RETURNING id',
            [userId, bookId, loanDate, dueDate]
          );
          await client.query(
            'UPDATE books SET available_copies = available_copies - 1 WHERE id = $1',
            [bookId]
          );
          await client.query('COMMIT');

          callback(null, { loanId: result.rows[0].id, status: 'Préstamo registrado exitosamente' });
        } catch (err) {
          console.error('Error en registrar préstamo:', err);
          callback({ Fault: { faultstring: 'Error al registrar el préstamo' } });
        }
      },

      // Registrar Devolución
      returnLoan: async (args, callback) => {
        const { loanId } = args;
        try {
          const client = await pool.connect();
          await client.query('BEGIN');
          const loan = await client.query('SELECT book_id, due_date FROM loans WHERE id = $1 AND return_date IS NULL', [loanId]);

          if (loan.rows.length === 0) {
            callback({ Fault: { faultstring: 'Préstamo no encontrado o ya devuelto' } });
            return;
          }

          const bookId = loan.rows[0].book_id;
          const fine = new Date() > loan.rows[0].due_date ? 5 : 0;

          await client.query('UPDATE loans SET return_date = NOW(), fine = $1 WHERE id = $2', [fine, loanId]);
          await client.query('UPDATE books SET available_copies = available_copies + 1 WHERE id = $1', [bookId]);
          await client.query('COMMIT');

          callback(null, { status: 'Devolución registrada exitosamente', fine });
        } catch (err) {
          console.error('Error en registrar devolución:', err);
          callback({ Fault: { faultstring: 'Error al registrar la devolución' } });
        }
      },

      // Generar reporte de préstamos activos
      getActiveLoans: async (args, callback) => {
        const { startDate, endDate } = args;
        try {
          const result = await pool.query(
            'SELECT loans.id, users.username, books.title, loans.loan_date, loans.due_date FROM loans INNER JOIN users ON loans.user_id = users.id INNER JOIN books ON loans.book_id = books.id WHERE loans.return_date IS NULL AND loans.loan_date BETWEEN $1 AND $2',
            [startDate || '1900-01-01', endDate || '9999-12-31']
          );
          callback(null, { loans: result.rows });
        } catch (err) {
          console.error('Error al obtener préstamos activos:', err);
          callback({ Fault: { faultstring: 'Error al obtener los préstamos activos' } });
        }
      },

      // Historial de préstamos de un usuario
      getUserHistory: async (args, callback) => {
        const { userId } = args;
        try {
          const result = await pool.query(
            'SELECT books.title, loans.loan_date, loans.due_date, loans.return_date, loans.fine FROM loans INNER JOIN books ON loans.book_id = books.id WHERE loans.user_id = $1',
            [userId]
          );
          callback(null, { history: result.rows });
        } catch (err) {
          console.error('Error al obtener historial de usuario:', err);
          callback({ Fault: { faultstring: 'Error al obtener el historial del usuario' } });
        }
      },

      // Registro de Usuario
      registerUser: async (args, callback) => {
        const { username, idInstitucional, password, role, status } = args;
        try {
          const client = await pool.connect();
          const result = await client.query(
            'INSERT INTO users (username, id_institucional, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [username, idInstitucional, password, role, status]
          );
          callback(null, { userId: result.rows[0].id, status: 'Usuario registrado exitosamente' });
        } catch (err) {
          console.error('Error al registrar usuario:', err);
          callback({ Fault: { faultstring: 'Error al registrar el usuario' } });
        }
      },

      // Suspender Usuario
      suspendUser: async (args, callback) => {
        const { userId } = args;
        try {
          const client = await pool.connect();
          const result = await client.query(
            'UPDATE users SET status = false WHERE id = $1 RETURNING id',
            [userId]
          );
          if (result.rows.length === 0) {
            callback({ Fault: { faultstring: 'Usuario no encontrado' } });
          } else {
            callback(null, { status: 'Usuario suspendido exitosamente' });
          }
        } catch (err) {
          console.error('Error al suspender usuario:', err);
          callback({ Fault: { faultstring: 'Error al suspender el usuario' } });
        }
      },
    },
  },
};

const xml = fs.readFileSync(path.join(__dirname, 'library-service.wsdl'), 'utf8');

// Configurar diferentes URLs para cada operación
app.listen(8000, () => {
  soap.listen(app, '/registerLoan', { LibraryService: { LibraryServicePort: { registerLoan: service.LibraryService.LibraryServicePort.registerLoan } } }, xml);
  soap.listen(app, '/returnLoan', { LibraryService: { LibraryServicePort: { returnLoan: service.LibraryService.LibraryServicePort.returnLoan } } }, xml);
  soap.listen(app, '/getActiveLoans', { LibraryService: { LibraryServicePort: { getActiveLoans: service.LibraryService.LibraryServicePort.getActiveLoans } } }, xml);
  soap.listen(app, '/getUserHistory', { LibraryService: { LibraryServicePort: { getUserHistory: service.LibraryService.LibraryServicePort.getUserHistory } } }, xml);
  soap.listen(app, '/registerUser', { LibraryService: { LibraryServicePort: { registerUser: service.LibraryService.LibraryServicePort.registerUser } } }, xml);
  soap.listen(app, '/suspendUser', { LibraryService: { LibraryServicePort: { suspendUser: service.LibraryService.LibraryServicePort.suspendUser } } }, xml);

  console.log('SOAP services listening on multiple endpoints');
});
