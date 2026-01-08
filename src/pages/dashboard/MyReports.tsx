import { useState } from 'react';
import { NavBar, Table, Spinner, Pagination } from '../../components/index';
import { useGetTicket } from '../../hooks';

export const MyReports = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const { dataTicket, isLoading, isFetching, error, refetch } =
    useGetTicket(paginaActual);

  const totalPaginas = dataTicket?.total_paginas || 1;

  const handleNext = () => {
    if (paginaActual < totalPaginas) setPaginaActual((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (paginaActual > 1) setPaginaActual((prev) => prev - 1);
  };

  const handleSetPage = (num: number) => {
    setPaginaActual(num);
  };

  return (
    <>
      <NavBar />
      {(isLoading || isFetching) && (
        <div>
          <Spinner />
        </div>
      )}

      {error && !isLoading && (
        <div className='flex flex-col items-center justify-center min-h-screen space-y-4'>
          <span className='text-red-500 font-medium text-lg text-center px-4'>
            No se pudieron cargar los reportes
          </span>
          <button
            onClick={() => refetch()}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer'
          >
            Reintentar conexión
          </button>
        </div>
      )}

      {!isLoading &&
        !error &&
        dataTicket?.resultado &&
        dataTicket.resultado.length > 0 && (
          <div className=''>
            {isFetching && (
              <div className='flex justify-center mb-2'>
                <span className='text-xs text-blue-500 animate-pulse'>
                  Sincronizando con el servidor...
                </span>
              </div>
            )}
            <div className='flex flex-col justify-center items-center min-h-screen'>
              <Table dataTickets={dataTicket} />
              <Pagination
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onNext={handleNext}
                onPrev={handlePrev}
                onSetPage={handleSetPage}
              />
            </div>
          </div>
        )}

      {!isLoading &&
        !error &&
        dataTicket?.resultado &&
        dataTicket.resultado.length === 0 && (
          <div className='flex flex-col items-center justify-center min-h-screen'>
            <span className='text-gray-500 dark:text-gray-400 text-lg font-medium'>
              No hay reportes
            </span>
            <button
              onClick={() => refetch()}
              className='mt-4 text-blue-500 hover:underline text-sm cursor-pointer'
            >
              Actualizar ahora
            </button>
          </div>
        )}
    </>
  );
};
