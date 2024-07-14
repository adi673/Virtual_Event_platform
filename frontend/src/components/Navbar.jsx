import React from 'react';
import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../hooks/AuthContext';

function Navbar() {
  const { token } = useContext(AuthContext);
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300 hover:text-white'}>
            Home
          </NavLink>
        </li>
        {token ? (
          <>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300 hover:text-white'}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300 hover:text-white'}>
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/register" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300 hover:text-white'}>
                Register
              </NavLink> 
            </li>

            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300 hover:text-white'}>
                Login
              </NavLink>
            </li>
          </>
        )}
        

        

        {/* also create li for dashboard */}
      </ul>
    </nav>
  );
}

export default Navbar;

