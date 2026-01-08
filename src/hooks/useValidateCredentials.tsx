import { useEffect } from 'react';
import { type LoginInputs } from '../types/index';
import { useNavigate } from 'react-router-dom';

export const useValidateCredentials = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAuthenticate') === 'true') {
      navigate('/reportes');
    }
  }, [navigate]);

  const handleLogin = async (data: LoginInputs) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (
      data.correo === 'omar@hospital.com' &&
      data.contrasena === 'Hospital20'
    ) {
      localStorage.setItem('isAuthenticate', 'true');
      navigate('/reportes');
    } else {
      throw new Error('Las credenciales no son las correctas');
    }
  };

  return {
    handleLogin,
  };
};
