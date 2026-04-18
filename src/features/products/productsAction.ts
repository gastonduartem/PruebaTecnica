import {AppDispatch} from '../../app/store';
import {getProducts} from '../../api/productsApi';
import {
  setProducts,
  setStatus,
  setError,
} from './productsSlice';

// Esta es una función async que usa dispatch.
// No es un reducer, es lógica externa.
export const fetchProducts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      // 1. Indicamos que estamos cargando
      dispatch(setStatus('loading'));

      // 2. Llamamos a la API
      const data = await getProducts(10, 0);

      // 3. Guardamos los productos en el state
      dispatch(setProducts(data.products));

      // 4. Indicamos que salió bien
      dispatch(setStatus('succeeded'));
    } catch (error) {
      // 5. Guardamos error si falla
      dispatch(setError('Error al cargar productos'));
      dispatch(setStatus('failed'));
    }
  };
};