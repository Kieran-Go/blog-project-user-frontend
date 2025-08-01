// src/components/App.jsx
import { useEffect, useContext } from 'react';
import '../css/App.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

function App() {
  const { user, loading, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Blog Project";
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/home');
  }

  return (
    <>
      <h1>My Blog</h1>

      {!loading && user && (
        <div className="auth-links">
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      )}

      {!loading && !user && (
        <div className="auth-links">
          <Link to="/signup">Sign Up</Link> | <Link to="/login">Log In</Link>
        </div>
      )}

      <Outlet />
    </>
  );
}

export default App;