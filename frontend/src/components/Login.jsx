import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, seetToken] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email)
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });
      setToken(response.data.token);
      seetToken(response.data.token)
      localStorage.setItem('token', token);
      
      console.log(response.data);
      
    } catch (error) {
      console.error(error.response.data);
    }
  };
  

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" onClick={(handleLogin)}>Login</button>
      {token}
    </form>
  );
};

export default Login;
