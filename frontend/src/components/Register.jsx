import { useState,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../hooks/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const {token,updateToken}=useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (email === "" || password === "" || confirmPassword === "") {
      alert("Please provide valid input");
      return;
    }


    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", {
        email,
        password,
        confirmPassword,
      });
    
      // console.log(res.data);
      if (response.data) {
        console.log("REs.token : ",response.data.token)
        updateToken(response.data.token);
        localStorage.setItem("site", response.token);
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
