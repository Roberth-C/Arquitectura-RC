import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Cambie esto a la URL de su backend

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { username, password });

    // Validar que la respuesta contiene el rol esperado
    const { role } = response.data;

    // Mapeo de roles
    if (role === 1) return 'ADMIN';
    if (role === 2) return 'LIBRARIAN';
    if (role === 3) return 'STUDENT';

    // Si el rol no es reconocido
    throw new Error('Rol no reconocido.');
  } catch (error) {
    // Manejar errores de la API o de conexión
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error('Error al iniciar sesión. Verifique las credenciales.');
  }
};
