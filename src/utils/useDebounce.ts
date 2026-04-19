import {useEffect, useState} from 'react';

// Este hook recibe un valor y espera un tiempo antes de devolverlo.
// Se usa para evitar disparar búsquedas en cada tecla.
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiamos el timeout anterior si el valor cambia antes de tiempo
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};