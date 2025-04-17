
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {isAuthenticated && (
        <>
          <Link to="/productos" className="nav-link">Productos</Link>
          <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
