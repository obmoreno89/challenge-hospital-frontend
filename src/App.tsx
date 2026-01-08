import { Route, Routes, Navigate } from 'react-router-dom';
import { Login, MyReports, TicketCreate } from './pages/index';
import { PrivateRoute } from './routes/index';
import './index.css';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login/*' element={<Login />} />
      <Route
        path='/reportes/*'
        element={
          <PrivateRoute>
            <MyReports />
          </PrivateRoute>
        }
      />
      <Route
        path='/crear-ticket/*'
        element={
          <PrivateRoute>
            <TicketCreate />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
