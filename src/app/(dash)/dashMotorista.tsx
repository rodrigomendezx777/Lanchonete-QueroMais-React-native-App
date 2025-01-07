import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { theme } from '@/theme';


interface Produto {
    id: string;
    nome: string;
    preco: string;
  }
  
  interface Loja {
    id: string;
    nome: string;
    produtos: Produto[];
  }
  



export default function DashMotorista() {
  // Simulação de dados de 5 lojas com produtos
  const [lojas, setLojas] = useState([
    {
      id: '1',
      nome: 'Loja 1',
      produtos: [
        { id: 'p1', nome: 'Produto A1', preco: 'R$ 10,00' },
        { id: 'p2', nome: 'Produto A2', preco: 'R$ 20,00' },
      ],
    },
    {
      id: '2',
      nome: 'Loja 2',
      produtos: [
        { id: 'p3', nome: 'Produto B1', preco: 'R$ 15,00' },
        { id: 'p4', nome: 'Produto B2', preco: 'R$ 25,00' },
      ],
    },
    {
      id: '3',
      nome: 'Loja 3',
      produtos: [
        { id: 'p5', nome: 'Produto C1', preco: 'R$ 30,00' },
      ],
    },
    {
      id: '4',
      nome: 'Loja 4',
      produtos: [
        { id: 'p6', nome: 'Produto D1', preco: 'R$ 40,00' },
        { id: 'p7', nome: 'Produto D2', preco: 'R$ 50,00' },
      ],
    },
    {
      id: '5',
      nome: 'Loja 5',
      produtos: [
        { id: 'p8', nome: 'Produto E1', preco: 'R$ 60,00' },
      ],
    },
  ]);

  const renderProduto = ({ item }: { item: Produto }) => (
    <View style={styles.produto}>
      <Text style={styles.produtoNome}>{item.nome}</Text>
      <Text style={styles.produtoPreco}>{item.preco}</Text>
    </View>
  );
  
  const renderLoja = ({ item }: { item: Loja }) => (
    <View style={styles.loja}>
      <Text style={styles.lojaNome}>{item.nome}</Text>
      <FlatList
        data={item.produtos}
        renderItem={renderProduto}
        keyExtractor={(produto) => produto.id}
      />
    </View>
  );
  

  return (
    <FlatList
      data={lojas}
      renderItem={renderLoja}
      keyExtractor={(loja) => loja.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.white,
  },
  loja: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 10,
  },
  lojaNome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.black,
  },
  produto: {
    padding: 10,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  produtoNome: {
    fontSize: 16,
    color: theme.colors.black,
  },
  produtoPreco: {
    fontSize: 14,
    color: theme.colors.gray,
  },
});
