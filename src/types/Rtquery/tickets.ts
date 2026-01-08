export interface Ticket {
  id: number;
  asunto: string;
  prioridad: number;
  detalle: string;
  fecha: string;
  estatus: number;
  archivo_url: string;
}

export interface TicketsResponse {
  folio: string;
  mensaje: string;
  resultado: Ticket[];
  total_registros: number;
  total_paginas: number;
  pagina_actual: number;
}

export interface TicketSendResponse {
  folio: string;
  mensaje: string;
}
