import React from 'react';
import { Link } from 'react-router-dom';

function AccessDenied() {
  return (
    <div className="container text-center mt-5">
      <h1>Acceso Denegado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
    </div>
  );
}

export default AccessDenied;
