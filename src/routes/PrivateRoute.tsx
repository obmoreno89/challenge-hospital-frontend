import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const isAuth = localStorage.getItem('isAuthenticate') === 'true';

  if (!isAuth) {
    return <Navigate to='/login' replace />;
  }

  return children;
};
