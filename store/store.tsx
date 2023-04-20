import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './ModalSlice';
import favoriteReducer from './FavoriteSlice';
import searchReducer from './SearchSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    favorite: favoriteReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
