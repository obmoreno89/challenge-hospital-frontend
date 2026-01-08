import { NavBar, ModalForm } from '../../components/index';
import { useTicketSend } from '../../hooks/index';

export const TicketCreate = () => {
  const { postCreateTicket, isSuccessCreateTicket } = useTicketSend();
  return (
    <>
      <NavBar />
      <ModalForm
        titleButton='Enviar'
        titleModal='Crear Ticket'
        isSuccessSend={isSuccessCreateTicket}
        onSubmitAction={postCreateTicket}
      />
    </>
  );
};
