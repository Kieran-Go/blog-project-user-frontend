import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Signup() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password }),
        });

        const data = await res.json();
        console.log('DATA: ' + data.token);

        if (res.ok) {
            localStorage.setItem('token', data.token);
            setUser(data.user);
            navigate('/home');
        } else {
            alert(data.message || 'Login failed');
        }
    }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="name" 
        value={name}
        onChange={(e) => setName(e.target.value)} 
        placeholder="Username" 
        required
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}