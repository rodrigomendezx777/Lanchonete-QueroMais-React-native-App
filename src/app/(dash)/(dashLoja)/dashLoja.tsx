import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity,ImageBackground } from "react-native";
import { theme } from "@/theme";
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';  // Importando os ícones
import { useCart } from '@/contexts/CartContext';

// Defina o tipo para os produtos
interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
}

const Dashloja = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts: Product[] = [
        { id: '1', name: 'Produto 1', price: 100, image: require('../../../../assets/images/icon.png') },
        { id: '2', name: 'Produto 2', price: 150, image: require('../../../../assets/images/icon.png') },
        { id: '3', name: 'Produto 3', price: 200, image: require('../../../../assets/images/icon.png') },
        { id: '4', name: 'Produto 4', price: 250, image: require('../../../../assets/images/icon.png') },
        { id: '5', name: 'Produto 5', price: 300, image: require('../../../../assets/images/icon.png') },
        { id: '6', name: 'Produto 6', price: 350, image: require('../../../../assets/images/icon.png') },
        { id: '7', name: 'Produto 7', price: 350, image: require('../../../../assets/images/icon.png') },
        { id: '8', name: 'Produto 8', price: 350, image: require('../../../../assets/images/icon.png') },
        { id: '9', name: 'Produto 9', price: 350, image: require('../../../../assets/images/icon.png') },
        { id: '10', name: 'Produto 10', price: 350, image: require('../../../../assets/images/icon.png') },
      ];
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <ImageBackground 
    source={require('../../../../assets/images/background.png')} 
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
      <View style={styles.header}>

        <Image source={require('../../../../assets/images/LogoQueroMais.png')} alt="Logo" style={styles.headerLogo} />

        <TouchableOpacity onPress={() => router.push('/(dash)/(dashLoja)/CartScreen')}>
          {/* Substituindo a imagem por um ícone */}
          <Feather name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.productsContainer}>
        <View style={styles.row}>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Image source={product.image} style={styles.productImage} resizeMode="contain" />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>R$ {product.price}</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product)}>
                <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.cartSummary}>
        <Text style={styles.cartSummaryText}>Itens no Carrinho: {cart.length}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => router.push('/(dash)/(dashLoja)/CartScreen')}>
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // ou 'stretch', dependendo do efeito desejado
    backgroundColor: theme.colors.vermelhoclaro
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: theme.colors.vermelhoclaro,
    width: '100%',
    elevation:20,
   
  },
  headerLogo: {
    width: 100,
    height: 50,
    resizeMode: 'cover',
  },
  
  cartIcon: {
    width: 24,
    height: 24,
  },
  productsContainer: {
    padding: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que os itens se alinhem em múltiplas linhas
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation:5,
  },
  productImage: {
    width: 120,
    height: 120,
  },
  productName: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: theme.colors.vermelhoclaro,
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: theme.colors.vermelhoclaro,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
  },
  cartSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cartSummaryText: {
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: theme.colors.vermelhoclaro,
    padding: 15,
    borderRadius: 15,
  },
  checkoutButtonText: {
    color: '#fff',
  },
});

export default Dashloja;
