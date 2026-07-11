import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, user } = useAuth();

  console.log("isLoggedIn:", isLoggedIn);
  console.log("user:", user);
  console.log("token:", localStorage.getItem("token"));

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}