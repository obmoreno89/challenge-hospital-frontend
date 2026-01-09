import { type CreateTicketInputs } from '../types/index';
import { useAppDispatch } from '../store/hooks';
import { clearStateForm } from '../store/slice/formData';
import { useCreateTicketMutation } from '../store/apis/index';
import { useNavigate } from 'react-router-dom';

export const useTicketSend = () => {
  const [
    createTicket,
    { isLoading: isLoadingCreateTicket, isSuccess: isSuccessCreateTicket },
  ] = useCreateTicketMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const postCreateTicket = async (data: CreateTicketInputs) => {
    const formData = new FormData();
    const { archivo, ...rest } = data;

    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (archivo && archivo[0]) {
      formData.append('archivo', archivo[0]);
    }

    try {
      await createTicket(formData).unwrap();
      setTimeout(() => {
        dispatch(clearStateForm());
        navigate('/reportes');
      }, 3000);
    } catch (error) {
      console.error('Error al enviar el ticket:', error);
      throw error;
    }
  };

  return {
    isLoadingCreateTicket,
    postCreateTicket,
    isSuccessCreateTicket,
  };
};
