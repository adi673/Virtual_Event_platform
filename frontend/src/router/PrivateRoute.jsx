// import React, { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import AuthContext from "../hooks/AuthContext";

// const PrivateRoute = () => {
//   const { token }=useContext(AuthContext);
//   console.log("PrivateRoute token");
//   console.log(token);
//   if (!token) return <Navigate to="/login" />;
//   return <Outlet />;
// };

// export default PrivateRoute;

import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../hooks/AuthContext";

const PrivateRoute = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    console.log("PrivateRoute token:", token);
  }, [token]); // Run this effect whenever `token` changes

  if (!token) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRoute;

