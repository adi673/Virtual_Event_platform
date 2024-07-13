import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? 'text-white' : 'text-gray-300 hover:text-white'
            }
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? 'text-white' : 'text-gray-300 hover:text-white'
            }
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
