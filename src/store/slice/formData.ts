import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TicketState {
  asunto: string;
  detalle?: string;
  id: number;
}

const initialState: TicketState = {
  id: 0,
  asunto: '',
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<TicketState>>) => {
      const { payload } = action;

      if (payload.id !== undefined) {
        state.id = payload.id;
      }
      if (payload.asunto !== undefined) {
        state.asunto = payload.asunto;
      }
    },
    clearStateForm: (state) => {
      state.id = 0;
      state.asunto = '';
      state.detalle = '';
    },
  },
});

export const { setFormData, clearStateForm } = formDataSlice.actions;
export default formDataSlice.reducer;
