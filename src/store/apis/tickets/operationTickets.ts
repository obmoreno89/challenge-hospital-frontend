import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import {
  type TicketsResponse,
  type TicketSendResponse,
  type DetailTicketResponse,
  type Ticket,
} from '../../../types';

const baseQueryWithRetry = retry(
  fetchBaseQuery({
    baseUrl: 'https://web-production-1ca9.up.railway.app/hospital/v1',
  }),
  { maxRetries: 2 }
);

export const operationTickets = createApi({
  reducerPath: 'operationTickets',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Tickets'],
  endpoints: (builder) => ({
    getTickets: builder.query<TicketsResponse, number>({
      query: (page = 1) => ({
        url: `/operaciones/tickets?page=${page}`,
      }),
      providesTags: ['Tickets'],
    }),

    getTicketById: builder.query<Ticket, number | string>({
      query: (id) => ({
        url: `/operaciones/tickets/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: DetailTicketResponse): Ticket =>
        response.resultado,
      providesTags: (_result, _error, id) => [{ type: 'Tickets', id }],
    }),

    createTicket: builder.mutation<TicketSendResponse, FormData>({
      query: (newTicketFormData) => ({
        url: '/operaciones/crear',
        method: 'POST',
        body: newTicketFormData,
      }),

      invalidatesTags: ['Tickets'],
    }),

    updateTicket: builder.mutation<
      TicketSendResponse,
      { id: number; estatus: string | number }
    >({
      query: ({ id, estatus }) => ({
        url: `/operaciones/actualiza/${id}`,
        method: 'PATCH',
        body: { estatus: estatus },
      }),
      invalidatesTags: ['Tickets'],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useCreateTicketMutation,
  useLazyGetTicketByIdQuery,
  useUpdateTicketMutation,
} = operationTickets;
