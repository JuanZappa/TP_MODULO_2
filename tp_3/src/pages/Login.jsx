
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usuario || !contraseña) {
      setError('Ambos campos son obligatorios');
      return;
    }
    const success = auth.login(usuario, contraseña);
    if (success) {
      navigate('/productos');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Iniciar sesión</h2>
      <div>
        <label>Usuario:</label>
        <input value={usuario} onChange={(e) => setUsuario(e.target.value)} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
      </div>
      <button type="submit">Ingresar</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default Login;
