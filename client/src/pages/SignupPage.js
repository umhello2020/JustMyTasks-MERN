import React, { useState } from 'react';
import Auth from '../utils/auth';
import styles from './SignupPage.module.css';
import apiEndpoints from '../utils/api';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: name, // Changed from `name` to `username`
      email,
      password,
    };

    apiEndpoints.createUser(userData)
      .then(createdUser => {
        console.log(createdUser);
        // Additional logic after successful user creation

        // Call the signup method from Auth
        Auth.signup(userData)
          .then(({ token }) => {
            // Additional logic after successful signup
            Auth.setToken(token);
          })
          .catch(error => {
            console.error('Error signing up:', error);
            // Additional error handling logic for signup
          });
      })
      .catch(error => {
        console.error('Error creating user:', error);
        // Additional error handling logic for createUser
      });

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








