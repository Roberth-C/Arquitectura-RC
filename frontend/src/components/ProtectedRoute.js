import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('role'); // Recupera el rol desde localStorage

  if (!role) {
    // Si no hay rol almacenado, redirige al login
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(role)) {
    // Si el rol no está permitido para esta ruta, redirige a una página de acceso denegado
    return <Navigate to="/access-denied" />;
  }

  return children;
};

export default ProtectedRoute;
