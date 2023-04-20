import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ModalState {
  movieId?: string;
  isOpen: boolean;
  tvShow: boolean;
}

interface OpenModalPayload {
  id: string;
  tvShow: boolean;
}

const initialState: ModalState = {
  movieId: undefined,
  isOpen: false,
  tvShow: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      state.movieId = action.payload.id;
      state.tvShow = action.payload.tvShow;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.movieId = undefined;
      state.isOpen = false;
    },
  },
});

export const selectModal = (state: RootState) => state.modal;

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
