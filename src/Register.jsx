import React, { useState, useContext } from 'react';
import { UserContext } from './context/UserContext';

const Register = () => {
  const { user, login, logout, error, loading } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    try {
      const url = isSignUp ? '/api/register' : '/api/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        login(data.user);
        window.location.href = '/'; 
      } else {
        console.log(data.message || 'An error occurred');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
    </div>
  );
};

export default Register;
