import React, { useState } from 'react';
import { loginUser } from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Call the loginUser API method with the provided credentials
    loginUser({ email, password })
      .then((response) => {
        console.log('Login successful:', response);
        // Perform any necessary actions after successful login
      })
      .catch((error) => {
        setError('Login failed. Please try again.');
        console.error(error);
      })
      .finally(() => {
        setEmail('');
        setPassword('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
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
};

export default Login;
