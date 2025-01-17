import axios from 'axios';

const API_URL = 'http://localhost:8080/api/books';

// Obtener todos los libros
export const getAllBooks = async () => {
  const username = localStorage.getItem('username'); // Recupera el username almacenado
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  const response = await axios.get(API_URL, {
    headers: { username }, // Envía el encabezado con el username
  });
  return response.data;
};

// Crear un nuevo libro
export const addBook = async (bookData) => {
  const username = localStorage.getItem('username'); // Recupera el username desde localStorage
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  await axios.post(API_URL, bookData, {
    headers: { username }, // Envía el encabezado correctamente
  });
};

// Actualizar un libro existente
export const updateBook = async (id, bookData) => {
  const username = localStorage.getItem('username'); // Recupera el username desde localStorage
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  await axios.put(`${API_URL}/${id}`, bookData, {
    headers: { username }, // Envía el encabezado correctamente
  });
};

// Eliminar un libro
export const deleteBook = async (id) => {
  const username = localStorage.getItem('username'); 
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  await axios.delete(`${API_URL}/${id}`, {
    headers: { username }, 
  });
};

// Buscar libro por ISBN
export const getBookByIsbn = async (isbn) => {
  const username = localStorage.getItem('username');
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  const response = await axios.get(`${API_URL}/isbn/${isbn}`, {
    headers: { username },
  });
  return response.data;
};

// Buscar libros por título
export const getBooksByTitle = async (title) => {
  const username = localStorage.getItem('username');
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  const response = await axios.get(`${API_URL}/title/${title}`, {
    headers: { username },
  });
  return response.data;
};

// Buscar libros por autor
export const getBooksByAuthor = async (author) => {
  const username = localStorage.getItem('username');
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  const response = await axios.get(`${API_URL}/author/${author}`, {
    headers: { username },
  });
  return response.data;
};

// Filtrar libros por categoría, estado, o rango de años
export const filterBooks = async (filters) => {
  const username = localStorage.getItem('username');
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  const { category, status, yearFrom, yearTo } = filters;
  const params = {
    ...(category && { category }),
    ...(status && { status }),
    ...(yearFrom && { yearFrom }),
    ...(yearTo && { yearTo }),
  };

  const response = await axios.get(`${API_URL}/filter`, {
    headers: { username },
    params, // Envía los filtros como parámetros de consulta
  });
  return response.data;
};
