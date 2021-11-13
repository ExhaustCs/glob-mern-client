import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const response = await axios.post(
        'https://glob-a-blog-app.herokuapp.com/api/auth/register',
        {
          username,
          password,
          email,
        }
      );
      // console.log(response);

      response.data && window.location.replace('/login');
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className='register'>
      <span className='registerTitle'>Register</span>
      <form className='registerForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className='registerInput'
          type='text'
          placeholder='Enter your username...'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type='text'
          className='registerInput'
          placeholder='Enter your email...'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className='registerInput'
          type='password'
          placeholder='Enter your password...'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='registerButton'>
          <Link className='link' to='/register'>
            Register
          </Link>
        </button>
      </form>
      <button className='registerLoginButton'>
        <Link className='link' to='/login'>
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: 'red', marginTop: '10px' }}>
          something went wrong!
        </span>
      )}
    </div>
  );
}
