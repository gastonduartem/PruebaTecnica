import {api} from './axios';
import type {Product} from '../features/products/types';

// Tipo de respuesta que devuelve DummyJSON en el listado.
// No devuelve solo un array, sino un objeto con más información.
interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Trae productos paginados.
// "limit" define cuántos traer.
// "skip" define cuántos saltar.
export const getProducts = async (
  limit: number,
  skip: number,
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    `/products?limit=${limit}&skip=${skip}`,
  );

  return response.data;
};

// Busca productos por título o texto.
// DummyJSON usa el endpoint /products/search?q=...
export const searchProducts = async (
  query: string,
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    `/products/search?q=${encodeURIComponent(query)}`,
  );

  return response.data;
};

// Trae el detalle de un producto por id.
export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);

  return response.data;
};