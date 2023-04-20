import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface FavoriteSlice {
  [id: string]: {
    id: string;
    backdrop_path: string;
    genre_ids: number[];
    title: string;
    isTvShow?: boolean;
  };
}

const initialState: FavoriteSlice = JSON.parse(
  typeof window !== 'undefined'
    ? localStorage.getItem('favorite') || '{}'
    : '{}'
);

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (
      state,
      action: PayloadAction<{
        id: string;
        backdrop_path: string;
        genre_ids: number[];
        title: string;
        isTvShow?: boolean;
      }>
    ) => {
      const { id, backdrop_path, genre_ids, title, isTvShow } = action.payload;

      if (state[id]) return;

      state[id] = { id, backdrop_path, genre_ids, title, isTvShow };
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorite', JSON.stringify(state));
      }
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      const favoriteId = action.payload;
      delete state[favoriteId];
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorite', JSON.stringify(state));
      }
    },
  },
});

export const selectFavorite = (state: RootState) => state.favorite;

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
