import { useLazyGetTicketByIdQuery } from '../store/apis';

export const useGetTicketById = () => {
  const [triggerGetDetails, { data: ticketData, isLoading: isLoadingDetail }] =
    useLazyGetTicketByIdQuery();

  const handleOpenDetails = async (id: number) => {
    try {
      const response = await triggerGetDetails(id).unwrap();
      if (response) {
        localStorage.setItem('ticketStorage', JSON.stringify(response));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleOpenDetails,
    ticketData,
    isLoadingDetail,
  };
};
