import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useAppDispatch, useAppSelector} from '../app/hooks';
import {fetchProducts} from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  // Leemos estado global desde Redux
  const products = useAppSelector(state => state.products.items);
  const status = useAppSelector(state => state.products.status);
  const error = useAppSelector(state => state.products.error);

  useEffect(() => {
    // Cargamos productos al montar la pantalla
    dispatch(fetchProducts({page: 0, limit: 10}));
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Cargando productos...</Text>
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>{error || 'Ocurrió un error'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Productos</Text>

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen;