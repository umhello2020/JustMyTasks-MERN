import React from 'react';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h2 className={styles.notFoundTitle}>404 Not Found</h2>
      <p className={styles.notFoundText}>
        The page you are looking for does not exist.
      </p>
      <p className={styles.notFoundText}>
        Go back to <span className={styles.notFoundLink}>homepage</span>.
      </p>
    </div>
  );
};

export default NotFound;
