import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { theme } from '@/theme';
import { useCart } from '@/contexts/CartContext';

// Tipo para os produtos no carrinho
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
}

const CartScreen = () => {
  const router = useRouter();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const handleRemoveProduct = (id: string) => {
    removeFromCart(id);
  };

  const handleIncreaseQuantity = (id: string) => {
    increaseQuantity(id);
  };

  const handleDecreaseQuantity = (id: string) => {
    decreaseQuantity(id);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push('/(dash)/(dashLoja)/FinalizarListaScreen');
    }
  };

  const totalPrice = cart.reduce((sum, product) => sum + product.price * (product.quantity || 1), 0);

  return (
    <ImageBackground 
      source={require('../../../../assets/images/background.png')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/dashLoja')}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carrinho de Compras</Text>
        </View>

        <ScrollView contentContainerStyle={styles.productsContainer}>
          {cart.map(product => (
            <View key={product.id} style={styles.productCard}>
              <Image source={product.image} style={styles.productImage} resizeMode="contain" />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>R$ {product.price}</Text>
                <View style={styles.quantityControl}>
                  <TouchableOpacity onPress={() => handleDecreaseQuantity(product.id)}>
                    <Feather name="minus-circle" size={24} color={theme.colors.vermelhoclaro} />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{product.quantity || 1}</Text>
                  <TouchableOpacity onPress={() => handleIncreaseQuantity(product.id)}>
                    <Feather name="plus-circle" size={24} color={theme.colors.vermelhoclaro} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handleRemoveProduct(product.id)}>
                  <Feather name="trash-2" size={24} color={theme.colors.vermelhoclaro} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.cartSummary}>
          <Text style={styles.cartSummaryText}>Total: R$ {totalPrice.toFixed(2)}</Text>
          <TouchableOpacity 
            style={[styles.checkoutButton, cart.length === 0 && styles.buttonDisabled]} 
            onPress={handleCheckout}
            disabled={cart.length === 0}
          >
            <Text style={styles.checkoutButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: theme.colors.vermelhoclaro,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  productsContainer: {
    padding: 10,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: theme.colors.vermelhoclaro,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
  },
  cartSummary: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartSummaryText: {
    fontSize: 18,
  },
  checkoutButton: {
    backgroundColor: theme.colors.vermelhoclaro,
    padding: 10,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: '#fff',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default CartScreen;
