import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import axios from 'axios';

export const searchMovies = createAsyncThunk(
  'search/searchMovies',
  async ({ query, page }: { query: string; page: number }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`
    );
    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [] as unknown[],
    status: 'idle',
    error: '',
    page: 1,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      state.results = [];
      state.page = 1;
    },
    setPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = [...state.results, ...action.payload.results];
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export const SelectSearch = (state: RootState) => state.search;

export const { setQuery, setPage } = searchSlice.actions;

export default searchSlice.reducer;
