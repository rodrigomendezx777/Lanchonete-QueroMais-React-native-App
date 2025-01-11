import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { theme } from '@/theme';
import { useCart } from '@/contexts/CartContext';
import { criarPedido } from '@/services/pedidos';

const FinalizarListaScreen = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [endereco, setEndereco] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const totalPrice = cart.reduce((sum, product) => sum + product.price * (product.quantity || 1), 0);

  const handleFinalizarPedido = async () => {
    try {
      const pedido = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          checked: false
        })),
        endereco,
        observacoes,
        totalPrice,
        status: 'pendente' as const,
        dataCriacao: new Date().toISOString(),
      };

      await criarPedido(pedido);
      clearCart();
      router.push('/dashLoja');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      // Aqui você pode adicionar um feedback visual para o usuário
      // como um Alert ou um Toast
    }
  };

  return (
    <ImageBackground 
      source={require('../../../../assets/images/background.png')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Finalizar Lista</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu endereço completo"
              value={endereco}
              onChangeText={setEndereco}
              multiline
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Observações</Text>
            <TextInput
              style={[styles.input, styles.observacoesInput]}
              placeholder="Alguma observação para o motorista?"
              value={observacoes}
              onChangeText={setObservacoes}
              multiline
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
            {cart.map(item => (
              <View key={item.id} style={styles.itemResumo}>
                <Text style={styles.itemNome}>{item.name}</Text>
                <Text style={styles.itemQuantidade}>Qtd: {item.quantity || 1}</Text>
                <Text style={styles.itemPreco}>R$ {(item.price * (item.quantity || 1)).toFixed(2)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totalSection}>
            <Text style={styles.totalText}>Total do Pedido:</Text>
            <Text style={styles.totalValue}>R$ {totalPrice.toFixed(2)}</Text>
          </View>
        </ScrollView>

        <TouchableOpacity 
          style={[styles.finalizarButton, !endereco && styles.buttonDisabled]}
          onPress={handleFinalizarPedido}
          disabled={!endereco}
        >
          <Text style={styles.finalizarButtonText}>Finalizar Pedido</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 15,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.vermelhoclaro,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  observacoesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  itemResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemNome: {
    flex: 2,
    fontSize: 16,
  },
  itemQuantidade: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  itemPreco: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    color: theme.colors.vermelhoclaro,
  },
  totalSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.vermelhoclaro,
  },
  finalizarButton: {
    backgroundColor: theme.colors.vermelhoclaro,
    padding: 15,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  finalizarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FinalizarListaScreen; 