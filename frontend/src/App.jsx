import React from 'react';
import './App.css';
import Heading from './components/Heading';

function App() {
  return (
    <><h1><Heading /></h1> 
    <div className="App">
      <div className="container">
        <input placeholder="Username" />
        <input placeholder="Password" type="password" />
        <button>LOGIN</button>
        <a className='forgot-password' href='/Forgot_Password'>forgot password</a>
      </div>
    </div>
    </>
  );
}

export default App;
