import axios from 'axios';

// Creamos una instancia de axios.
// Esto nos permite configurar una baseURL y reutilizarla en toda la app.
export const api = axios.create({
  baseURL: 'https://dummyjson.com', // API que vamos a usar
  timeout: 5000, // tiempo máximo de espera (5 segundos)
});