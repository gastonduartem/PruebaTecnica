import {AppDispatch} from '../../app/store';
import {getProducts} from '../../api/productsApi';
import {setProducts, setStatus, setError} from './productsSlice';

// Esta función hace la carga de productos y usa dispatch
// para ir actualizando el estado global.
export const fetchProducts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      // 1. Indicamos que estamos cargando
      dispatch(setStatus('loading'));

      // 2. Llamamos a la API
      const data = await getProducts(10, 0);

      // 3. Guardamos los productos en Redux
      dispatch(setProducts(data.products));

      // 4. Marcamos que terminó bien
      dispatch(setStatus('succeeded'));
    } catch (error: any) {
      // 5. Si algo falla, guardamos el error y cambiamos el estado
      dispatch(setError(error.message || 'Error al cargar productos'));
      dispatch(setStatus('failed'));
    }
  };
};