import { useGetTicketsQuery } from '../store/apis/index';

export const useGetTicket = (page: number) => {
  const {
    data: dataTicket,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetTicketsQuery(page);

  return {
    dataTicket,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
