import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Product, ProductsStatus} from './types';

// Este es el estado que va a manejar la parte "products" del store.
interface ProductsState {
  items: Product[];
  status: ProductsStatus;
  error: string | null;
  page: number;
  limit: number;
  hasMore: boolean;
  query: string;
}

// Estado inicial.
// Es cómo arranca Redux antes de traer productos.
const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  page: 0,
  limit: 10,
  hasMore: true,
  query: '',
};

// createSlice crea:
// 1. reducers
// 2. acciones automáticamente
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Reemplaza toda la lista de productos
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },

    // Agrega productos al final de la lista actual
    appendProducts(state, action: PayloadAction<Product[]>) {
      state.items = [...state.items, ...action.payload];
    },

    // Cambia el estado de carga: idle, loading, succeeded, failed
    setStatus(state, action: PayloadAction<ProductsStatus>) {
      state.status = action.payload;
    },

    // Guarda un mensaje de error o lo limpia
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    // Guarda la página actual
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    // Indica si todavía hay más productos para cargar
    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload;
    },

    // Guarda el texto de búsqueda actual
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },

    // Resetea el estado de productos a su valor inicial
    resetProductsState(state) {
      state.items = [];
      state.status = 'idle';
      state.error = null;
      state.page = 0;
      state.hasMore = true;
      state.query = '';
    },
  },
});

// Exportamos las acciones para poder usarlas desde componentes o thunks
export const {
  setProducts,
  appendProducts,
  setStatus,
  setError,
  setPage,
  setHasMore,
  setQuery,
  resetProductsState,
} = productsSlice.actions;

// Exportamos el reducer para conectarlo al store
export default productsSlice.reducer;