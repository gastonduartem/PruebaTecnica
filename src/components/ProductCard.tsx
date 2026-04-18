import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import type {Product} from '../features/products/types';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

const ProductCard = ({product, onPress}: ProductCardProps) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{uri: product.thumbnail}} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <Text style={styles.price}>${product.price}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    backgroundColor: '#f2f2f2',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2e7d32',
  },
});

export default ProductCard;