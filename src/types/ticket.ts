export interface CreateTicketInputs {
  asunto: string;
  prioridad: number;
  detalle: string;
  archivo: FileList;
}
