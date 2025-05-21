'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiLock2Line, RiUserLine } from 'react-icons/ri';
import styles from '../Login/styles/Login.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // Try to parse JSON response safely
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.message || 'Login failed');
      } else {
        // Check if user object and userType exist
        const userType = data.user?.userType;

        if (!userType) {
          setError('User type not found in response.');
          setLoading(false);
          return;
        }

        // Redirect based on userType
        if (userType === 'customer') {
          router.push('/customer/dashboard');
        } else if (userType === 'seller') {
          router.push('/seller/dashboard');
        } else {
          setError('Unknown user type');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  }

  return (
    <div className={styles.body}>
      <div className={styles.lwrapper}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.linputBox}>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i><RiUserLine /></i>
          </div>

          <div className={styles.linputBox}>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i><RiLock2Line /></i>
          </div>

          <div className={styles.lrememberFrogot}>
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>

          <button className={styles.lbtn} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}

          <div className={styles.lregisterLink}>
            <p>Don't have an account? <a href="/Registration">Register</a></p>
          </div>

          <div className={styles.lbackHome}>
            <a href="/" className={styles.lhomeBtn}>← Back to Home</a>
          </div>
        </form>
      </div>
    </div>
  );
}
