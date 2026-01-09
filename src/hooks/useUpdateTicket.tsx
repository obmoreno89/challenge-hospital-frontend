import { useAppSelector } from '../store/hooks';
import { useUpdateTicketMutation } from '../store/apis';

export const useUpdateTicket = () => {
  const { id } = useAppSelector((state) => state.formData);
  const [
    updateStatus,
    { isLoading: isLoadingUpdateTicket, isError: isErrorUpdateTicker },
  ] = useUpdateTicketMutation();

  const patchTicket = async (newStatus: string | number) => {
    if (id && newStatus) {
      try {
        await updateStatus({
          id: id,
          estatus: newStatus,
        }).unwrap();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { patchTicket, isLoadingUpdateTicket, isErrorUpdateTicker };
};
