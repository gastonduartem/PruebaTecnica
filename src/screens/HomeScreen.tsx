import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useAppDispatch, useAppSelector} from '../app/hooks';
import {
  fetchProducts,
  setPage,
} from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();

  // Estado global
  const products = useAppSelector(state => state.products.items);
  const status = useAppSelector(state => state.products.status);
  const error = useAppSelector(state => state.products.error);
  const page = useAppSelector(state => state.products.page);
  const limit = useAppSelector(state => state.products.limit);
  const hasMore = useAppSelector(state => state.products.hasMore);

  useEffect(() => {
    // Solo cargamos si todavía no hay productos
    if (products.length === 0) {
      dispatch(fetchProducts({page: 0, limit}));
    }
  }, [dispatch, products.length, limit]);

  const handleLoadMore = () => {
    const nextPage = page + 1;

    // Guardamos la página siguiente y traemos más productos
    dispatch(setPage(nextPage));
    dispatch(fetchProducts({page: nextPage, limit}));
  };

  // Loading inicial
  if (status === 'loading' && products.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Cargando productos...</Text>
      </View>
    );
  }

  // Error inicial
  if (status === 'failed' && products.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>{error || 'Ocurrió un error'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Productos</Text>

        <Pressable
          style={styles.favoritesButton}
          onPress={() => navigation.navigate('Favorites')}>
          <Text style={styles.favoritesButtonText}>Favoritos</Text>
        </Pressable>
      </View>

      {/* Lista */}
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetail', {
                productId: item.id,
              })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          hasMore ? (
            <View style={styles.footer}>
              <Pressable
                style={styles.loadMoreButton}
                onPress={handleLoadMore}
                disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loadMoreText}>Load more products</Text>
                )}
              </Pressable>
            </View>
          ) : (
            <View style={styles.footer}>
              <Text style={styles.endText}>There are no more productss</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  headerRow: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  favoritesButton: {
    backgroundColor: '#111',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  favoritesButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#111',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 140,
    alignItems: 'center',
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: '600',
  },
  endText: {
    color: '#666',
    fontSize: 14,
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