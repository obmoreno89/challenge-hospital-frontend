import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { type TicketsResponse, type TicketSendResponse } from '../../../types';

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

    createTicket: builder.mutation<TicketSendResponse, FormData>({
      query: (newTicketFormData) => ({
        url: '/operaciones/crear',
        method: 'POST',
        body: newTicketFormData,
      }),

      invalidatesTags: ['Tickets'],
    }),
  }),
});

export const { useGetTicketsQuery, useCreateTicketMutation } = operationTickets;
