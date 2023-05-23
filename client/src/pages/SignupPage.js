import React, { useState } from 'react';
import Auth from '../utils/auth';
import styles from './SignupPage.module.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.signup({ name, email, password });
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.signupTitle}>Signup</h1>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <input
          className={styles.signupInput}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          className={styles.signupInput}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className={styles.signupInput}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className={styles.signupButton} type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;

