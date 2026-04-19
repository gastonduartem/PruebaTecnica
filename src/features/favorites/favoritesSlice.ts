import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Product} from '../products/types';

interface FavoritesState {
  entities: Record<number, Product>;
}

const initialState: FavoritesState = {
  entities: {},
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Product>) {
      const product = action.payload;

      if (state.entities[product.id]) {
        delete state.entities[product.id];
      } else {
        state.entities[product.id] = product;
      }
    },
    setFavorites(state, action: PayloadAction<Record<number, Product>>) {
      state.entities = action.payload;
    },
    clearFavorites(state) {
      state.entities = {};
    },
  },
});

export const {toggleFavorite, setFavorites, clearFavorites} =
  favoritesSlice.actions;

export default favoritesSlice.reducer;