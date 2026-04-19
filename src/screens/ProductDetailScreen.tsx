import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../app/hooks';
import {toggleFavorite} from '../features/favorites/favoritesSlice';
import type {RootStackParamList} from '../navigation/AppNavigator';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<ProductDetailRouteProp>();

  // Obtenemos el id que nos mandaron desde Home
  const {productId} = route.params;

  // Buscamos el producto dentro del estado global
  const product = useAppSelector(state =>
    state.products.items.find(item => item.id === productId),
  );

  // Revisamos si ese producto ya está en favoritos
  const isFavorite = useAppSelector(
    state => !!state.favorites.entities[productId],
  );

  // Si por algún motivo no encontramos el producto, mostramos fallback
  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Product not found.</Text>
      </View>
    );
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagen principal */}
      <Image source={{uri: product.thumbnail}} style={styles.image} />

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>

        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Pressable
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
          ]}
          onPress={handleToggleFavorite}>
          <Text
            style={[
              styles.favoriteButtonText,
              isFavorite && styles.favoriteButtonTextActive,
            ]}>
            {isFavorite ? 'Delete from favorites' : 'Add to favorites'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    backgroundColor: '#fafafa',
  },
  image: {
    width: '100%',
    height: 320,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 24,
  },
  favoriteButton: {
    backgroundColor: '#111',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: '#ffe7e7',
    borderWidth: 1,
    borderColor: '#d32f2f',
  },
  favoriteButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  favoriteButtonTextActive: {
    color: '#d32f2f',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#444',
  },
});

export default ProductDetailScreen;