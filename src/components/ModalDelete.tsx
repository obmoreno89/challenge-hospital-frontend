import { useDeleteTicket } from '../hooks';
import { useAppSelector } from '../store/hooks';

interface ModalConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const ModalDelete = ({
  isOpen,
  onClose,
  title,
}: ModalConfirmDeleteProps) => {
  const { confirmDeleteTicket, isLoadingDeleteTicket } = useDeleteTicket();
  const { id } = useAppSelector((state) => state.formData);
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
      <div className='bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow-2xl transform transition-all'>
        <div className='flex justify-center pt-6'>
          <div className='bg-red-100 dark:bg-red-900/30 p-3 rounded-full'>
            <svg
              className='w-8 h-8 text-red-600 dark:text-red-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </div>
        </div>

        <div className='p-6 text-center'>
          <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
            ¿Estás seguro?
          </h3>
          <p className='text-gray-500 dark:text-gray-400'>
            ¿Realmente deseas eliminar el {title}? Esta acción no se puede
            deshacer.
          </p>
        </div>

        <div className='flex gap-3 p-6 rounded-b-xl'>
          <button
            onClick={onClose}
            className='flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50'
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              confirmDeleteTicket(id);
              onClose();
            }}
            disabled={isLoadingDeleteTicket}
            className='flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2'
          >
            {isLoadingDeleteTicket ? (
              <span className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
            ) : null}
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
