import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
//SLICE
import formDataSlice from './slice/formData';
//API
import { operationTickets } from './apis/index';

export const store = configureStore({
  reducer: {
    //SLICE
    formData: formDataSlice,
    //API
    [operationTickets.reducerPath]: operationTickets.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([operationTickets.middleware]),
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
