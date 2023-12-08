import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.scss';

const LoginForm = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', user);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // บันทึก token ใน localStorage
        console.log('Login successful');
        if (user.username.toLowerCase() === 'admin') {
          navigate('/admin'); // Assuming '/admin' is the route for the admin page
        } else {
          navigate('/'); // Redirect to home page for other users
        }
      }
    } catch (error) {
      console.error('There was an error while trying to login!', error);
      setError('Invalid username or password!');
    }
  };

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <input type='text' name='username' placeholder='Username' value={user.username} onChange={handleChange} required />
      <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleChange} required />
      {error && <p className="error">{error}</p>}
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
