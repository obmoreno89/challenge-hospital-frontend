import { type TicketsResponse } from '../types/index';
import { useState } from 'react';
import { ModalDetails } from './index';
import { useGetTicketById } from '../hooks';
import { useAppDispatch } from '../store/hooks';
import { setFormData } from '../store/slice/formData';
import { statusStyles, statusTicket } from '../model';

interface TicketsProps {
  dataTickets: TicketsResponse | undefined;
}

export const Table = ({ dataTickets }: TicketsProps) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const tickets = dataTickets?.resultado || [];
  const { handleOpenDetails, ticketData, isLoadingDetail } = useGetTicketById();
  const dispatch = useAppDispatch();

  return (
    <>
      <div className='p-4 sm:p-8 flex justify-center items-center'>
        <div className='w-full max-w-4xl overflow-hidden shadow-lg rounded-xl border border-gray-200 dark:border-gray-700'>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-4'>
                    Asunto
                  </th>
                  <th scope='col' className='px-6 py-4 text-center'>
                    Prioridad
                  </th>
                  <th scope='col' className='px-6 py-4 text-center'>
                    Fecha
                  </th>
                  <th scope='col' className='px-6 py-4 text-center'>
                    Estatus
                  </th>
                  <th scope='col' className='px-6 py-4 text-center'>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className='bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors'
                  >
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                    >
                      {ticket.asunto}
                    </th>
                    <td className='px-6 py-4 text-center'>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ticket.prioridad === 1
                            ? 'bg-red-100 text-red-800'
                            : ticket.prioridad === 2
                            ? 'bg-orange-100 text-orange-400'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {ticket.prioridad === 1
                          ? 'Alta'
                          : ticket.prioridad === 2
                          ? 'Media'
                          : 'Baja'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-center'>{ticket.fecha}</td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center'>
                        <div
                          className={`h-2.5 w-2.5 rounded-full mr-2 ${
                            statusStyles[ticket.estatus] || 'bg-gray-500'
                          }`}
                        ></div>

                        <span className='font-medium'>
                          {statusTicket.find((s) => s.id === ticket.estatus)
                            ?.name || 'Desconocido'}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 flex justify-center space-x-3'>
                      <button
                        onClick={() => {
                          handleOpenDetails(ticket.id);
                          dispatch(setFormData({ id: ticket.id }));
                          setIsViewModalOpen(true);
                        }}
                        className='text-blue-600 dark:text-blue-500 hover:scale-110 transition-transform p-1 cursor-pointer'
                      >
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </svg>
                      </button>
                      <button className='text-red-600 dark:text-red-500 hover:scale-110 transition-transform p-1 cursor-pointer'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalDetails
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        ticketDetailData={ticketData}
        isLoading={isLoadingDetail}
      />
    </>
  );
};
