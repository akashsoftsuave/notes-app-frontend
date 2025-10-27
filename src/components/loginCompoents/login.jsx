import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import '../common-style/login.css';

function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/home" replace />;
  }


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState('');

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Minimum 6 characters, at least one uppercase, one lowercase, one number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setEmailError('');
    setPasswordError('');
    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!validateEmail(email)) {
      setEmailError('Invalid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 6 characters and include uppercase, lowercase, and a number.'
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setSuccess('Login successful! Redirecting to home...');
        form.reset();
        navigate('/home');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerContainer">
      <div>
        <form onSubmit={handleSubmit}>
            <span className='label'>Email</span>
            <input type="text" name="email" placeholder="Email" />
          {emailError && <span className='errorClass'>{emailError}</span>}
          <br />
            <span className='label'>Password</span>
            <input type="password" name="password" placeholder="Password" />
          {passwordError && <span className='errorClass'>{passwordError}</span>}
          <br />
          {error && <span className='errorClass'>{error}</span>}
          <br />
          {success && <span className='successClass'>{success}</span>}
          <button type="submit" disabled={loading} className='buttonstyle'>
            {loading ? 'logging in...' : 'Login'}
          </button>
          <div className='loginUrl'>
             don't have an account? <Link to="/register">register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
