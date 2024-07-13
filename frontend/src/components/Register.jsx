import React, { useState } from 'react';
import axios from 'axios';



const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  // const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        email,
        password,
        confirmPassword
      });
      console.log(response.data);
      history.push('/profile');
      //handle non success case 
      
    } catch (error) {
      console.error(error.response.data);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit" onClick={(handleRegister)}>Register</button>
      </form>
    </>
    


  );
};

export default Register;
