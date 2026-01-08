import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TicketState {
  asunto: string;
  detalle?: string;
}

const initialState: TicketState = {
  asunto: '',
  detalle: '',
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<TicketState>>) => {
      const { payload } = action;

      if (payload.asunto !== undefined) {
        state.asunto = payload.asunto;
      }
      if (payload.detalle !== undefined) {
        state.detalle = payload.detalle;
      }
    },
    clearStateForm: (state) => {
      state.asunto = '';
      state.detalle = '';
    },
  },
});

export const { setFormData, clearStateForm } = formDataSlice.actions;
export default formDataSlice.reducer;
