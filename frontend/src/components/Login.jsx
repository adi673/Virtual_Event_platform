import { useState,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../hooks/AuthContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateToken } =useContext(AuthContext); 
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email)
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      });

      if (response.data) {
        console.log("login : ",response.data)
        console.log("Res.token : ",response.data.token)
        updateToken(response.data.token);
        localStorage.setItem("site", response.token);
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
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
      
    </form>
  );
};

export default Login;