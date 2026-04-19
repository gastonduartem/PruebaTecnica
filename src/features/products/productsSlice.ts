import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {getProducts, searchProducts} from '../../api/productsApi';
import type {Product, ProductsStatus} from './types';

// Estado que maneja todo lo relacionado a productos
interface ProductsState {
  items: Product[];
  status: ProductsStatus;
  error: string | null;
  page: number;
  limit: number;
  hasMore: boolean;
  query: string;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  page: 0,
  limit: 10,
  hasMore: true,
  query: '',
};

// Thunk para traer productos paginados
// "page" representa la página actual.
// "limit" representa cuántos productos traer.
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    {page, limit}: {page: number; limit: number},
    {rejectWithValue},
  ) => {
    try {
      const skip = page * limit;
      const data = await getProducts(limit, skip);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar productos');
    }
  },
);

// Thunk para buscar productos
export const fetchSearchedProducts = createAsyncThunk(
  'products/fetchSearchedProducts',
  async (query: string, {rejectWithValue}) => {
    try {
      const data = await searchProducts(query);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al buscar productos');
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Guarda la página actual
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    // Guarda el texto actual de búsqueda
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },

    // Resetea parte del estado cuando queramos reiniciar el listado
    resetProductsState(state) {
      state.items = [];
      state.status = 'idle';
      state.error = null;
      state.page = 0;
      state.hasMore = true;
      state.query = '';
    },
  },
  extraReducers: builder => {
    builder
      // Loading inicial / paginación
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const {products, total, skip, limit} = action.payload;

        // Si estamos en la primera página, reemplazamos todo
        if (skip === 0) {
          state.items = products;
        } else {
          // Si no, agregamos al final (paginación)
          state.items = [...state.items, ...products];
        }

        state.status = 'succeeded';
        state.hasMore = skip + limit < total;

        // Guardamos la página actual en base al skip recibido
        state.page = Math.floor(skip / limit);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as string) || 'Error loading products';
      })

      // Búsqueda
      .addCase(fetchSearchedProducts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSearchedProducts.fulfilled, (state, action) => {
        const {products} = action.payload;
        state.items = products;
        state.status = 'succeeded';
        state.hasMore = false; // por ahora búsqueda sin paginación
      })
      .addCase(fetchSearchedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as string) || 'Error al buscar productos';
      });
  },
});

export const {setPage, setQuery, resetProductsState} = productsSlice.actions;

export default productsSlice.reducer;