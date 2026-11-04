import { createSlice } from '@reduxjs/toolkit';

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState: { ids: [] },
  reducers: {
    alternarFavorito(state, action) {
      const id = action.payload;
      if (state.ids.includes(id)) state.ids = state.ids.filter(actual => actual !== id);
      else state.ids.push(id);
    },
    vaciarFavoritos(state) {
      state.ids = [];
    }
  }
});

export const { alternarFavorito, vaciarFavoritos } = favoritosSlice.actions;
export default favoritosSlice.reducer;
