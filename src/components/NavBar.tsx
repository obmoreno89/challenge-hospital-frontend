import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticate');
    navigate('/login');
  };

  const getLinkClassName = (path: string) => {
    const isActive = location.pathname === path;

    const baseClasses =
      'w-full text-left block py-2 pr-4 pl-3  lg:border-0 lg:p-0 transition-colors';

    return isActive
      ? `${baseClasses} text-blue-600 dark:text-blue-500 font-bold`
      : `${baseClasses} text-gray-700 dark:text-gray-400 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer`;
  };
  return (
    <>
      <nav className='bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed w-full z-50 top-0'>
        <div className='flex flex-wrap justify-between items-center mx-auto'>
          <div
            className='flex items-center cursor-pointer'
            onClick={() => navigate('/reportes')}
          >
            <span
              onClick={() => navigate('/reportes')}
              className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'
            >
              🏥 Hospital
            </span>
          </div>

          <div className='flex items-center lg:order-2'>
            <button
              onClick={handleLogout}
              className='hidden lg:block text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition-colors cursor-pointer'
            >
              Cerrar Sesión
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type='button'
              className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            >
              <span className='sr-only'>Abrir menú</span>

              <svg
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                {isOpen ? (
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                ) : (
                  <path
                    fillRule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipRule='evenodd'
                  ></path>
                )}
              </svg>
            </button>
          </div>

          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
          >
            <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
              <li>
                <button
                  onClick={() => {
                    navigate('/reportes');
                    setIsOpen(false);
                  }}
                  className={getLinkClassName('/reportes')}
                >
                  Mis Reportes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/crear-ticket');
                    setIsOpen(false);
                  }}
                  className={getLinkClassName('/crear-ticket')}
                >
                  Crear Ticket
                </button>
              </li>

              <li className='lg:hidden'>
                <button
                  onClick={handleLogout}
                  className='w-full text-left block py-2 pr-4 pl-3 text-red-600 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
