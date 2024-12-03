import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
