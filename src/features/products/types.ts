// Representa la forma de un producto que viene de la API.
// Esto nos ayuda a tener tipado fuerte en toda la app.
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
}

// Define los posibles estados de carga para productos.
// Lo vamos a usar en Redux para saber si estamos cargando, si salió bien, o si hubo error.
export type ProductsStatus = 'idle' | 'loading' | 'succeeded' | 'failed';