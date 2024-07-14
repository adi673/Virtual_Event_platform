import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import Register from "../components/Register";
import PrivateRoute from "./PrivateRoute";
import Profile from "../components/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={<div>Dashboard</div>} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

export { router };
