import React, { useState } from 'react';
import { createUser } from '../utils/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!username || !email || !password) {
      setError('Please enter username, email, and password.');
      return;
    }

    // Call the createUser API method with the provided credentials
    createUser({ username, email, password })
      .then((response) => {
        console.log('Registration successful:', response);
      })
      .catch((error) => {
        setError('Registration failed. Please try again.');
        console.error(error);
      })
      .finally(() => {
        setUsername('');
        setEmail('');
        setPassword('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;





