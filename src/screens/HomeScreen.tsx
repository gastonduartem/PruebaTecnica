import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {useAppDispatch, useAppSelector} from '../app/hooks';
import {
  fetchProducts,
  fetchSearchedProducts,
  resetProductsState,
  setPage,
  setQuery,
  setRefreshing,
} from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import {useDebounce} from '../utils/useDebounce';

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
  const query = useAppSelector(state => state.products.query);
  const refreshing = useAppSelector(state => state.products.refreshing);

  // Valor de búsqueda con debounce
  const debouncedQuery = useDebounce(query, 300);

  // Carga inicial
  useEffect(() => {
    if (products.length === 0 && debouncedQuery.trim() === '') {
      dispatch(fetchProducts({page: 0, limit}));
    }
  }, [dispatch, products.length, limit, debouncedQuery]);

  // Búsqueda con debounce
  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (trimmedQuery.length > 0) {
      dispatch(fetchSearchedProducts(trimmedQuery));
    } else {
      // Si borran la búsqueda, reiniciamos y volvemos a cargar listado normal
      dispatch(resetProductsState());
      dispatch(fetchProducts({page: 0, limit}));
    }
  }, [debouncedQuery, dispatch, limit]);

  const handleLoadMore = () => {
    // Si estamos buscando, no mostramos más páginas
    if (query.trim().length > 0) {
      return;
    }

    const nextPage = page + 1;
    dispatch(setPage(nextPage));
    dispatch(fetchProducts({page: nextPage, limit}));
  };

  const handleSearchChange = (text: string) => {
    dispatch(setQuery(text));
  };

  const handleRefresh = async () => {
    // Si estamos buscando, refrescamos resultados de búsqueda
    if (query.trim().length > 0) {
      dispatch(setRefreshing(true));
      await dispatch(fetchSearchedProducts(query.trim()));
      dispatch(setRefreshing(false));
      return;
    }

    // Si no estamos buscando, refrescamos el listado normal
    dispatch(setRefreshing(true));
    dispatch(setPage(0));
    await dispatch(fetchProducts({page: 0, limit}));
    dispatch(setRefreshing(false));
  };

  // Loading inicial
  if (status === 'loading' && products.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading products...</Text>
      </View>
    );
  }

  // Error inicial
  if (status === 'failed' && products.length === 0) {
  const handleRetry = () => {
    if (query.trim().length > 0) {
      dispatch(fetchSearchedProducts(query.trim()));
    } else {
      dispatch(fetchProducts({page: 0, limit}));
    }
  };

  return (
    <View style={styles.center}>
      <Text style={styles.message}>{error || 'Ocurrió un error'}</Text>

      <Pressable style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryButtonText}>Reintentar</Text>
      </Pressable>
    </View>
  );
}

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Products</Text>

        <Pressable
          style={styles.favoritesButton}
          onPress={() => navigation.navigate('Favorites')}>
          <Text style={styles.favoritesButtonText}>Favorites</Text>
        </Pressable>
      </View>

      {/* Input de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          value={query}
          onChangeText={handleSearchChange}
          style={styles.searchInput}
        />
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
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={
          query.trim().length > 0 ? null : hasMore ? (
            <View style={styles.footer}>
              <Pressable
                style={styles.loadMoreButton}
                onPress={handleLoadMore}
                disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loadMoreText}>Load more</Text>
                )}
              </Pressable>
            </View>
          ) : (
            <View style={styles.footer}>
              <Text style={styles.endText}>There are no more products</Text>
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
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
  retryButton: {
  marginTop: 16,
  backgroundColor: '#111',
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 8,
},
retryButtonText: {
  color: '#fff',
  fontWeight: '600',
},
});

export default HomeScreen;