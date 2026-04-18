import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

// Importamos los tipos que definimos en el store
import type {AppDispatch, RootState} from './store';

// Hook personalizado para dispatch
// Esto asegura que cuando uses dispatch, TypeScript sepa qué tipo tiene
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook personalizado para leer el state
// Esto asegura que "state" tenga el tipo RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;