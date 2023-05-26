import React, { useState } from 'react';
import Auth from '../utils/auth';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.login({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div className={styles.loginPage}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className={styles.loginInput} // Add the class name
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.loginInput} // Add the class name
        />
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;


