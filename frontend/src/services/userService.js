import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const getAllUsers = async () => {
  const username = localStorage.getItem('username'); // Recupera el username almacenado
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  const response = await axios.get(API_URL, {
    headers: { username }, // Envía el encabezado
  });
  return response.data;
};




export const createUser = async (userData) => {
  const username = localStorage.getItem('username'); // Recupera el username desde localStorage
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  await axios.post(API_URL, userData, {
    headers: { username }, // Envía el encabezado correctamente
  });
};



export const updateUser = async (idInstitucional, userData) => {
  const username = localStorage.getItem('username'); // Recupera el username desde localStorage
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  await axios.put(`${API_URL}/${idInstitucional}`, userData, {
    headers: { username }, // Envía el encabezado correctamente
  });
};


export const suspendUser = async (idInstitucional) => {
  const username = localStorage.getItem('username'); 
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  await axios.put(`${API_URL}/${idInstitucional}/suspend`, null, {
    headers: { username }, 
  });
};


export const activateUser = async (idInstitucional) => {
  const username = localStorage.getItem('username'); 
  if (!username) {
    throw new Error('El usuario no está autenticado.');
  }

  await axios.put(`${API_URL}/${idInstitucional}/activate`, null, {
    headers: { username }, 
  });
};
