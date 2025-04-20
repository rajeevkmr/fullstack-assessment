import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.scss';

const NotFoundView: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        The page you are looking for does not exist.
      </p>
      <Link to='/' className={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundView;
