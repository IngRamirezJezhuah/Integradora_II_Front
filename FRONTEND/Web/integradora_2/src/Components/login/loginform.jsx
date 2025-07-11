import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log('API URL:', `${apiUrl}/usuarios/login`);
      console.log('API URL', apiUrl);
      const response = await fetch(`${apiUrl}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: username, contraseña: password }),
      });
      const text = await response.text();
      console.log('Raw response:', text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      setError('respuesta inesperada del servidor:\n' + text);
      return;
    }

    if (!response.ok) {
      throw new Error(data.message || 'Error en el login');
    }

    localStorage.setItem('token', data.token);

    if (onSubmit) {
      onSubmit({ success: true, token: data.token });
    }

    await Swal.fire({
      title: 'Login exitoso',
      icon: 'success',
      timer: 1200,
      showConfirmButton: false,
    });

    navigate('/Dashboard');
  } catch (err) {
    setError(err.message);
  }
      
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su correo"
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar sesión</button>
        <a href="/Recuperacion">Olvide la contraseña</a>
      </form>
    </div>
  );
};

export default LoginForm;