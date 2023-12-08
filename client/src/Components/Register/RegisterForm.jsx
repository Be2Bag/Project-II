import React, { useState } from 'react';
import axios from 'axios'; // make sure to install axios with 'npm install axios' if you haven't
import './RegisterForm.scss';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    phone_number: ''
  });

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
      // Send a post request to the server
      const response = await axios.post('http://localhost:3001/register', user);
      console.log(response.data); // handle the response as you wish
      navigate('/LoginForm');
    } catch (error) {
      console.error('There was an error registering the user!', error);
    }
  };

  return (
    <form className='register-form' onSubmit={handleSubmit}>
      <input type='text' name='username' placeholder='Username' value={user.username} onChange={handleChange} required />
      <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleChange} required />
      <input type='email' name='email' placeholder='Email' value={user.email} onChange={handleChange} required />
      <input type='text' name='phone_number' placeholder='Phone Number' value={user.phone_number} onChange={handleChange} required />
      <button type='submit'>Register</button>
    </form>
  );
};

export default RegisterForm;
