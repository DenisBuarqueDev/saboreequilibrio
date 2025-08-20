import { Navigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContextProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthValue();

  if (loading) return <p>Carregando...</p>;

  return user ? children : <Navigate to="/login" replace />;
  //return isAuthenticated ? children : <Navigate to="/login" replace />;
  
};


export default PrivateRoute;