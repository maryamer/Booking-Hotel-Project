import { useNavigate } from "react-router-dom";
import { useAuth } from "../context1/AuthProvider";
import { useEffect } from "react";

function ProtectedRoute({ children, isAuthenticated }) {
  // const { isAuthenticated } = useAuth();
  const naviagate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) naviagate("/login"); //AUTHENTICATON
  }, [isAuthenticated, naviagate]);

  return isAuthenticated ? children : null;
}
export default ProtectedRoute;
