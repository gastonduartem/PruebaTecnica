import React, {useEffect} from 'react';
import {Provider} from 'react-redux';

import {store, markFavoritesAsHydrated} from './src/app/store';
import AppNavigator from './src/navigation/AppNavigator';
import {setFavorites} from './src/features/favorites/favoritesSlice';
import {loadFavoritesFromStorage} from './src/features/favorites/favoritesStorage';

const App = () => {
  useEffect(() => {
    const hydrateFavorites = async () => {
      const storedFavorites = await loadFavoritesFromStorage();

      // Primero cargamos favoritos desde storage a Redux
      store.dispatch(setFavorites(storedFavorites));

      // Recién después habilitamos el guardado automático
      markFavoritesAsHydrated();
    };

    hydrateFavorites();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;