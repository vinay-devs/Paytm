import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/useAuth";

const ProtectedRoute = () => {
  const auth = useAuth();
  if (auth.token) {
    return <Outlet />;
  }
  return <Navigate to={"/signin"} />;
};

export default ProtectedRoute;
