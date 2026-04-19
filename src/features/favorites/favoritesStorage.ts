import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Product} from '../products/types';

// Clave que vamos a usar dentro de AsyncStorage
const FAVORITES_STORAGE_KEY = '@favorites';

// Guarda favoritos en AsyncStorage.
// Recibe el objeto completo de favoritos.
export const saveFavoritesToStorage = async (
  favorites: Record<number, Product>,
) => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.log('Error guardando favoritos en storage:', error);
  }
};

// Lee favoritos desde AsyncStorage.
// Si no hay nada, devuelve un objeto vacío.
export const loadFavoritesFromStorage = async (): Promise<
  Record<number, Product>
> => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!jsonValue) {
      return {};
    }

    return JSON.parse(jsonValue);
  } catch (error) {
    console.log('Error reading favorites from storage:', error);
    return {};
  }
};