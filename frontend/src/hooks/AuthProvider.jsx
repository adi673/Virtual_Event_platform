// AuthProvider.js
import React, { useState } from "react";
import AuthContext from "./AuthContext";


const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("site") || "");

  // Example function to update token
  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider ;

