import {configureStore} from '@reduxjs/toolkit';

import productsReducer from '../features/products/productsSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import {saveFavoritesToStorage} from '../features/favorites/favoritesStorage';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
  },
});

// Esta bandera evita guardar favoritos en storage
// antes de que la app termine de hidratar el estado inicial.
let hasHydratedFavorites = false;

// La vamos a exportar para activarla cuando terminemos
// de leer los favoritos desde AsyncStorage.
export const markFavoritesAsHydrated = () => {
  hasHydratedFavorites = true;
};

// Escuchamos cambios del store.
// Solo guardamos favoritos si la hidratación inicial ya terminó.
store.subscribe(() => {
  if (!hasHydratedFavorites) {
    return;
  }

  const state = store.getState();
  saveFavoritesToStorage(state.favorites.entities);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;