export interface CreateTicketInputs {
  asunto: string;
  prioridad: number;
  detalle: string;
  archivo: FileList;
}

export interface UpdateTicket {
  estatus: number | string;
}

export interface TicketDetail extends CreateTicketInputs {
  id: number;
  fecha: string;
  estatus: string;
}
