import {configureStore} from '@reduxjs/toolkit';

// Importamos los reducers de cada feature.
// Cada slice va a manejar una parte del estado global.
import productsReducer from '../features/products/productsSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

// Creamos el store global.
// Aca unimos todos los reducers en un solo estado.
export const store = configureStore({
  reducer: {
    // "products" sera una clave en el estado global
    products: productsReducer,

    // "favorites" sera otra clave en el estado global
    favorites: favoritesReducer,
  },
});

// Tipos derivados automaticamente del store.
// Sirven para tener autocompletado y evitar errores en toda la app.

// Tipo del estado completo de Redux
export type RootState = ReturnType<typeof store.getState>;

// Tipo del dispatch (para enviar acciones)
export type AppDispatch = typeof store.dispatch;