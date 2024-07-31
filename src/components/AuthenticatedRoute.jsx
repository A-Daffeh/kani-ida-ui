import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthenticatedRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);

  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthenticatedRoute;
