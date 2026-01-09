import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TicketState {
  id: number;
  asunto: string;
  prioridad: number;
  detalle?: string;
}

const initialState: TicketState = {
  id: 0,
  asunto: '',
  prioridad: 0,
  detalle: '',
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<TicketState>>) => {
      const { payload } = action;

      if (payload.id !== undefined) state.id = payload.id;
      if (payload.asunto !== undefined) state.asunto = payload.asunto;
      if (payload.prioridad !== undefined) state.prioridad = payload.prioridad;
      if (payload.detalle !== undefined) state.detalle = payload.detalle;
    },
    clearStateForm: (state) => {
      state.id = 0;
      state.asunto = '';
      state.prioridad = 0;
      state.detalle = '';
    },
  },
});

export const { setFormData, clearStateForm } = formDataSlice.actions;
export default formDataSlice.reducer;
