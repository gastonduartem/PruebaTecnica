import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';

import {useAppDispatch, useAppSelector} from '../app/hooks';
import {fetchProducts} from '../features/products/productsSlice';

// Esta pantalla carga productos cuando se monta
// y luego los muestra en una lista simple.
const HomeScreen = () => {
  const dispatch = useAppDispatch();

  // Leemos productos y estado desde Redux
  const products = useAppSelector(state => state.products.items);
  const status = useAppSelector(state => state.products.status);
  const error = useAppSelector(state => state.products.error);

  useEffect(() => {
    // Cuando la pantalla aparece por primera vez, cargamos productos
    dispatch(fetchProducts({page: 0, limit: 10}));
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.center}>
        <Text>{error || 'Ocurrió un error'}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>${item.price}</Text>
        </View>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
});

export default HomeScreen;