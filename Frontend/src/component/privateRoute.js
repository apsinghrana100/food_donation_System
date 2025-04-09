import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext"; 

const PrivateRoute = () => {
  const { accessToken,user } = useAuth();
  // const accessToken = true;
  console.log(`access token = ${accessToken,user}`)
  // If no access token, redirect to login page
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
