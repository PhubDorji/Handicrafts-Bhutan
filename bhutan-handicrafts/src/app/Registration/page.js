'use client';

import { useRouter } from 'next/navigation'; // <-- import this
import { useState } from 'react';
import { RiLock2Line, RiLockPasswordLine, RiMailLine, RiUserLine } from 'react-icons/ri';
import styles from '../Login/styles/Login.module.css';

export default function RegisterPage() {
  const router = useRouter(); // <-- initialize router

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
    setSuccess('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Registration failed');
      } else {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/Login'); // <-- redirect here
        }, 1500); // slight delay to show success message
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.lwrapper}>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className={styles.linputBox}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <i><RiUserLine /></i>
          </div>

          <div className={styles.linputBox}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <i><RiMailLine /></i>
          </div>

          <div className={styles.linputBox}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <i><RiLock2Line /></i>
          </div>

          <div className={styles.linputBox}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <i><RiLockPasswordLine /></i>
          </div>

          <div className={styles.linputBox}>
            <select
              name="userType"
              required
              className={styles.selectBox}
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="" disabled>Select user type</option>
              <option value="customer">Customer</option>
              <option value="seller">Seller / Artisan</option>
            </select>
          </div>

          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
          {success && <p style={{ color: 'lightgreen', marginBottom: '10px' }}>{success}</p>}

          <button type="submit" className={styles.lbtn}>Register</button>

          <div className={styles.lregisterLink}>
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>

          <div className={styles.lbackHome}>
            <a href="/" className={styles.lhomeBtn}>← Back to Home</a>
          </div>
        </form>
      </div>
    </div>
  );
}
