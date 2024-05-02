import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/store/useAuth";

const UnProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return !isLoggedIn ? <Outlet /> : <Navigate to={"/"} />;
};

export default UnProtectedRoute;
