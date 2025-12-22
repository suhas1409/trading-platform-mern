import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({children}) => {
  //step1: get token from local Storage
  const token = localStorage.getItem("token");
  //step2: If token existd then allow access
  if(token) {
    return children;
  }
  //step3: If token does not exists then redirect to login
  return <Navigate to="/login" replace/>;
}
