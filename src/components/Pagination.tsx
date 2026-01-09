interface PaginationProps {
  paginaActual: number;
  totalPaginas: number;
  onNext: () => void;
  onPrev: () => void;
  onSetPage: (pagina: number) => void;
}

export const Pagination = ({
  paginaActual,
  totalPaginas,
  onNext,
  onPrev,
  onSetPage,
}: PaginationProps) => {
  const baseArrowClass =
    'flex items-center justify-center h-full py-1.5 px-3 border border-gray-300 dark:border-gray-700 transition-colors';

  const activeClass =
    'text-gray-500 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 cursor-pointer';

  const disabledClass =
    'text-gray-300 bg-gray-50 dark:bg-gray-900 dark:text-gray-600 cursor-not-allowed opacity-50';

  const obtenerPaginasVisibles = () => {
    const paginas: (number | string)[] = [];
    const limite = 5;

    if (totalPaginas <= limite + 1) {
      for (let i = 1; i <= totalPaginas; i++) paginas.push(i);
    } else {
      for (let i = 1; i <= limite; i++) {
        paginas.push(i);
      }
      paginas.push('...');

      paginas.push(totalPaginas);
    }

    return paginas;
  };

  const paginasVisibles = obtenerPaginasVisibles();

  return (
    <div>
      <div className='w-full max-w-4xl flex flex-col items-center justify-between space-y-3 md:space-y-0 p-4 shadow-lg'>
        <span className='text-sm font-normal text-gray-500 dark:text-gray-400 mb-3'>
          Pagina{' '}
          <span className='font-semibold text-gray-900 dark:text-white'>
            {paginaActual}
          </span>{' '}
          de{' '}
          <span className='font-semibold text-gray-900 dark:text-white'>
            {totalPaginas}
          </span>
        </span>

        <ul className='inline-flex items-stretch -space-x-px'>
          <li>
            <button
              onClick={onPrev}
              disabled={paginaActual === 1}
              className={`${baseArrowClass} rounded-l-lg ${
                paginaActual === 1 ? disabledClass : activeClass
              }`}
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </li>
          {paginasVisibles.map((item, index) => (
            <li key={index}>
              {item === '...' ? (
                <span className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'>
                  {item}
                </span>
              ) : (
                <button
                  onClick={() => onSetPage(Number(item))}
                  className={`flex items-center justify-center text-sm py-2 px-3 leading-tight border border-gray-300 dark:border-gray-700 cursor-pointer transition-colors ${
                    paginaActual === item
                      ? 'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white font-bold'
                      : 'text-gray-500 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  {item}
                </button>
              )}
            </li>
          ))}
          <li>
            <button
              onClick={onNext}
              disabled={paginaActual === totalPaginas}
              className={`${baseArrowClass} rounded-r-lg ${
                paginaActual === totalPaginas ? disabledClass : activeClass
              }`}
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
