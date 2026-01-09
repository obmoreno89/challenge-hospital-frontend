import { useDeleteTicketMutation } from '../store/apis';

export const useDeleteTicket = () => {
  const [deleteTicket, { isLoading: isLoadingDeleteTicket }] =
    useDeleteTicketMutation();

  const confirmDeleteTicket = async (idTicket: number) => {
    try {
      await deleteTicket(idTicket).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    confirmDeleteTicket,
    isLoadingDeleteTicket,
  };
};
