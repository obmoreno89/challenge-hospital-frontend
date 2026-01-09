import { useForm } from 'react-hook-form';
import { type Ticket } from '../types';
import { statusTicket, priority } from '../model';
import { useEffect } from 'react';
import { useUpdateTicket } from '../hooks';
import { useAppDispatch } from '../store/hooks';
import { setFormData } from '../store/slice/formData';

interface ModalDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  ticketDetailData?: Ticket;
  isLoading: boolean;
  onUpdateStatus?: (id: string, newStatus: string) => Promise<void>;
}

export const ModalDetails = ({
  isOpen,
  onClose,
  ticketDetailData,
  isLoading,
}: ModalDetailsProps) => {
  const { register, watch } = useForm({
    defaultValues: {
      estatus: ticketDetailData?.estatus || '',
    },
  });
  const selectedStatus = watch('estatus');
  const dataTicketStorage = JSON.parse(
    localStorage.getItem('ticketStorage') || '{}'
  );
  const dispatch = useAppDispatch();
  const { patchTicket, isLoadingUpdateTicket, isErrorUpdateTicker } =
    useUpdateTicket();

  useEffect(() => {
    if (selectedStatus) {
      patchTicket(selectedStatus);
      dispatch(setFormData({ id: dataTicketStorage.id }));
    }
  }, [selectedStatus, patchTicket]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
      <div
        className='fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
        onClick={onClose}
      ></div>

      <div className='relative w-full max-w-md z-60 '>
        <div className='relative flex flex-col w-full bg-white border-0 rounded-2xl shadow-2xl dark:bg-gray-800 dark:border-gray-700 '>
          <div className='relative p-8 flex-auto'>
            <div className='flex justify-between items-start mb-6 border-b dark:border-gray-700 pb-4'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                Detalles del Ticket
              </h2>

              <span className='text-xs font-mono text-gray-400'>
                ID: {ticketDetailData?.id || dataTicketStorage?.id}
              </span>
            </div>

            {isLoading ? (
              <div className='flex justify-center items-center py-20 text-white'>
                Cargando...
              </div>
            ) : (
              <>
                <div className='space-y-6 '>
                  <div className='grid grid-cols-2 gap-4 '>
                    <div>
                      <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1'>
                        Fecha
                      </label>
                      <p className='text-sm text-gray-900 dark:text-gray-300'>
                        {ticketDetailData?.fecha || dataTicketStorage.fecha}
                      </p>
                    </div>
                    <div>
                      <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1'>
                        Prioridad
                      </label>
                      <p
                        className={`text-sm font-bold ${
                          (ticketDetailData?.prioridad ||
                            dataTicketStorage?.prioridad) === 1
                            ? 'text-red-500'
                            : (ticketDetailData?.prioridad ||
                                dataTicketStorage?.prioridad) === 2
                            ? 'text-orange-500'
                            : 'text-green-500'
                        }`}
                      >
                        {priority.find(
                          (p) =>
                            p.id ===
                            (ticketDetailData?.prioridad ||
                              dataTicketStorage?.prioridad)
                        )?.name || 'Sin prioridad'}
                      </p>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1'>
                        Asunto
                      </label>
                      <p className='text-sm font-medium text-gray-900 dark:text-white'>
                        {ticketDetailData?.asunto || dataTicketStorage.asunto}
                      </p>
                    </div>

                    <div>
                      <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1'>
                        Estatus
                      </label>

                      <p className='text-sm font-bold text-white dark:text-white'>
                        {statusTicket.find(
                          (s) =>
                            s.id === ticketDetailData?.estatus ||
                            dataTicketStorage.estatus
                        )?.name || 'Sin estado'}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-end justify-between bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border dark:border-gray-700'>
                    <div className='flex-1 pr-4'>
                      <label className='block text-xs font-bold text-gray-500 uppercase mb-2'>
                        Actualizar estatus del Ticket
                      </label>
                      <div className='relative'>
                        <form>
                          <select
                            {...register('estatus')}
                            className='block w-full p-2 text-sm font-bold rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500'
                          >
                            <option value=''>Selecciona el nuevo estado</option>
                            {statusTicket.map((opcion) => (
                              <option key={opcion.id} value={opcion.id}>
                                {opcion.name}
                              </option>
                            ))}
                          </select>
                        </form>
                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400'>
                          <svg
                            className='h-4 w-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M19 9l-7 7-7-7'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {!ticketDetailData?.archivo_url &&
                    !dataTicketStorage?.archivo_url ? (
                      <button
                        disabled
                        className='flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-not-allowed opacity-60'
                      >
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
                          />
                        </svg>
                        Sin adjunto
                      </button>
                    ) : (
                      <a
                        href={
                          ticketDetailData?.archivo_url ||
                          dataTicketStorage?.archivo_url ||
                          '#'
                        }
                        target='_blank'
                        rel='noreferrer'
                        download='ticket-archivo.pdf'
                        className='flex items-center gap-2 px-3 py-2 text-xs font-bold text-blue-600 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg transition-colors border border-blue-200 dark:border-blue-800'
                      >
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                          />
                        </svg>
                        Descargar
                      </a>
                    )}
                  </div>

                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                      Descripción Detallada
                    </label>
                    <div className='max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg border dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                      {ticketDetailData?.detalle ||
                        dataTicketStorage.detalle ||
                        'No hay descripción disponible.'}
                    </div>
                  </div>
                </div>
                {isErrorUpdateTicker && (
                  <div
                    className='p-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400 border border-red-200 dark:border-red-800 text-center font-medium mt-5'
                    role='alert'
                  >
                    Problemas con el servidor
                  </div>
                )}
                {isLoadingUpdateTicket && (
                  <div
                    className='p-3 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400 border border-green-200 dark:border-green-800 text-center font-medium mt-5'
                    role='alert'
                  >
                    Estatus actualizado
                  </div>
                )}
                <div className='flex gap-4 mt-8'>
                  <button
                    onClick={() => {
                      onClose();
                      localStorage.removeItem('ticketStorage');
                    }}
                    type='button'
                    className='flex-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95'
                  >
                    Cerrar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
