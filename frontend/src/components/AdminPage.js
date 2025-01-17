// AdminPage.js
import React, { useEffect, useState } from 'react';
import { getAllUsers, createUser, updateUser, suspendUser, activateUser } from '../services/userService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminPage.css';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [activeTab, setActiveTab] = useState('suspendActivate'); // 'suspendActivate', 'addUser', 'editUser'
  const [formData, setFormData] = useState({ username: '', password: '', role: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error.message);
    }
  };

  const handleSuspendActivate = async (user) => {
    try {
      if (user.status) {
        await suspendUser(user.idInstitucional);
      } else {
        await activateUser(user.idInstitucional);
      }
      fetchUsers();
    } catch (error) {
      console.error('Error al suspender/activar el usuario:', error.message);
    }
  };

  const handleFormSubmit = async () => {
    if (!formData.username || !formData.password || !formData.role) {
      alert('Todos los campos son obligatorios.');
      return;
    }
  
    try {
      if (activeTab === 'addUser') {
        await createUser(formData); // Llama a la función del servicio
      }
      fetchUsers(); // Actualiza la lista de usuarios
      setFormData({ username: '', password: '', role: '' });
    } catch (error) {
      console.error('Error al guardar el usuario:', error.message);
    }
  };
  
  
  

  return (
    <div className="admin-page">
      <header className="header">
        <nav className="nav nav-tabs">
          <button onClick={() => setActiveTab('suspendActivate')} className={`nav-link ${activeTab === 'suspendActivate' ? 'active' : ''}`}>
            Suspender/Activar
          </button>
          <button onClick={() => setActiveTab('addUser')} className={`nav-link ${activeTab === 'addUser' ? 'active' : ''}`}>
            Agregar Usuario
          </button>
          <button onClick={() => setActiveTab('editUser')} className={`nav-link ${activeTab === 'editUser' ? 'active' : ''}`}>
            Editar Usuario
          </button>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="btn btn-danger ms-auto">
            Cerrar Sesión
          </button>
        </nav>
      </header>

      <main className="mt-4">
        {activeTab === 'suspendActivate' && (
          <div>
            <h1>Gestión de Usuarios</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th>ID Institucional</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <input
                        type="radio"
                        name="selectedUser"
                        checked={selectedUserId === user.id}
                        onChange={() => setSelectedUserId(user.id)}
                      />
                    </td>
                    <td>{user.idInstitucional}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>{user.status ? 'Activo' : 'Suspendido'}</td>
                    <td>
                      <button
                        onClick={() => handleSuspendActivate(user)}
                        className={`btn ${user.status ? 'btn-warning' : 'btn-success'}`}
                      >
                        {user.status ? 'Suspender' : 'Activar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'addUser' && (
          <div>
            <h1>Agregar Usuario</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  <option value="">Seleccionar Rol</option>
                  <option value="1">Administrador</option>
                  <option value="2">Bibliotecario</option>
                  <option value="3">Estudiante</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
          </div>
        )}

        {activeTab === 'editUser' && (
          <div>
            <h1>Editar Usuario</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  <option value="">Seleccionar Rol</option>
                  <option value="1">Administrador</option>
                  <option value="2">Bibliotecario</option>
                  <option value="3">Estudiante</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPage;
