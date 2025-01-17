import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para autenticar (simulada por ahora)
        if (credentials.username === "admin" && credentials.password === "password") {
            login();
        } else {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Ingresar</button>
            </form>
        </div>
    );
};

export default LoginPage;
