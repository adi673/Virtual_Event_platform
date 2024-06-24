
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/profile" element={<Profile token={token} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// function App() {
//   const [post, SetPost] = useState('')

//   useEffect(() => { 
//     axios.get('http://localhost:3000/posts')
//     .then(response => {
//       console.log(response.data)
//       SetPost(response.data)
//     })
//     .catch(error => {
//       console.log(error)
//     })
//   })
  
//   return (
//     <>
//       <h1>{post}</h1>
//       <h1>Hello Vite + React!</h1>
//     </>
//   )
// }

// export default App