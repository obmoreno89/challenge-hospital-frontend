import { useLazyGetTicketByIdQuery } from '../store/apis';

export const useGetTicketById = () => {
  const [triggerGetDetails, { data: ticketData, isLoading: isLoadingDetail }] =
    useLazyGetTicketByIdQuery();

  const handleOpenDetails = async (id: number) => {
    try {
      await triggerGetDetails(id).unwrap();
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
