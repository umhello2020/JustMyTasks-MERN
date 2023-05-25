import React, { useState } from 'react';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Call the onRegister callback with the provided credentials
    onRegister({ username, password })
      .then((response) => {
        console.log('Registration successful:', response);
      })
      .catch((error) => {
        setError('Registration failed. Please try again.');
        console.error(error);
      })
      .finally(() => {
        setUsername('');
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
