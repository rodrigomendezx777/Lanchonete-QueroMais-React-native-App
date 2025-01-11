import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  RefreshControl,
  Alert
} from 'react-native';
import { theme } from '@/theme';
import { Feather } from '@expo/vector-icons';
import { buscarPedidosPendentes, aceitarPedido, atualizarStatusItem, Pedido } from '@/services/pedidos';
import { useAuth } from '@/contexts/AuthContext';

export default function DashMotorista() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const pedidosPendentes = await buscarPedidosPendentes();
      setPedidos(pedidosPendentes);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os pedidos.');
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    carregarPedidos();
  };

  const handleAceitarPedido = async (pedidoId: string) => {
    if (!user?.uid) {
      Alert.alert('Erro', 'Você precisa estar logado para aceitar pedidos.');
      return;
    }

    try {
      await aceitarPedido(pedidoId, user.uid);
      Alert.alert('Sucesso', 'Pedido aceito com sucesso!');
      carregarPedidos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível aceitar o pedido.');
      console.error('Erro ao aceitar pedido:', error);
    }
  };

  const handleToggleItem = async (pedido: Pedido, itemId: string) => {
    if (!pedido.id) return;

    try {
      const updatedItems = pedido.items.map(item => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      );

      await atualizarStatusItem(pedido.id, updatedItems);
      
      // Atualiza o estado local
      setPedidos(pedidos.map(p => 
        p.id === pedido.id ? { ...p, items: updatedItems } : p
      ));

      // Verifica se todos os itens foram marcados
      const todosItensMarcados = updatedItems.every(item => item.checked);
      if (todosItensMarcados) {
        Alert.alert('Parabéns!', 'Todos os itens foram coletados!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o item.');
      console.error('Erro ao atualizar item:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return theme.colors.yellowDark;
      case 'aceito':
        return theme.colors.vermelhoclaro;
      case 'em_andamento':
        return theme.colors.redLight;
      case 'concluido':
        return theme.colors.redDark;
      default:
        return theme.colors.gray;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.vermelhoclaro} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.vermelhoclaro]}
        />
      }
    >
      {pedidos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="inbox" size={64} color={theme.colors.gray} />
          <Text style={styles.emptyText}>Nenhum pedido disponível</Text>
        </View>
      ) : (
        pedidos.map(pedido => (
          <View key={pedido.id} style={styles.pedidoCard}>
            <View style={styles.pedidoHeader}>
              <View>
                <Text style={styles.pedidoTitle}>Pedido #{pedido.id?.slice(-4)}</Text>
                <Text style={[styles.pedidoStatus, { color: getStatusColor(pedido.status) }]}>
                  {pedido.status.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.pedidoData}>
                {new Date(pedido.dataCriacao).toLocaleDateString('pt-BR')}
              </Text>
            </View>

            <View style={styles.endereco}>
              <Text style={styles.enderecoLabel}>Endereço de entrega:</Text>
              <Text style={styles.enderecoText}>{pedido.endereco}</Text>
            </View>

            {pedido.observacoes && (
              <View style={styles.observacoes}>
                <Text style={styles.observacoesLabel}>Observações:</Text>
                <Text style={styles.observacoesText}>{pedido.observacoes}</Text>
              </View>
            )}

            <View style={styles.itensList}>
              <Text style={styles.itensLabel}>Itens:</Text>
              {pedido.items.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.itemRow,
                    item.checked && styles.itemChecked
                  ]}
                  onPress={() => pedido.status === 'aceito' && handleToggleItem(pedido, item.id)}
                  disabled={pedido.status !== 'aceito'}
                >
                  <View style={styles.itemCheck}>
                    {item.checked ? (
                      <Feather name="check-square" size={24} color={theme.colors.vermelhoclaro} />
                    ) : (
                      <Feather name="square" size={24} color={theme.colors.vermelhoclaro} />
                    )}
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={[styles.itemName, item.checked && styles.itemTextChecked]}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemQuantidade}>Quantidade: {item.quantity}</Text>
                  </View>
                  <Text style={styles.itemPreco}>
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>R$ {pedido.totalPrice.toFixed(2)}</Text>
            </View>

            {pedido.status === 'pendente' && (
              <TouchableOpacity
                style={styles.aceitarButton}
                onPress={() => handleAceitarPedido(pedido.id!)}
              >
                <Text style={styles.aceitarButtonText}>Aceitar Pedido</Text>
              </TouchableOpacity>
            )}

            {pedido.status === 'aceito' && (
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>
                  {pedido.items.filter(item => item.checked).length} de {pedido.items.length} itens coletados
                </Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
                      { 
                        width: `${(pedido.items.filter(item => item.checked).length / pedido.items.length) * 100}%` 
                      }
                    ]} 
                  />
                </View>
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: theme.colors.gray,
    marginTop: 10,
  },
  pedidoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  pedidoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pedidoStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  pedidoData: {
    fontSize: 14,
    color: theme.colors.gray,
  },
  endereco: {
    marginBottom: 10,
  },
  enderecoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  enderecoText: {
    fontSize: 16,
  },
  observacoes: {
    marginBottom: 10,
  },
  observacoesLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  observacoesText: {
    fontSize: 16,
  },
  itensList: {
    marginBottom: 10,
  },
  itensLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemChecked: {
    backgroundColor: '#f8f8f8',
  },
  itemCheck: {
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    color: theme.colors.gray,
  },
  itemQuantidade: {
    fontSize: 14,
    color: theme.colors.gray,
    marginTop: 5,
  },
  itemPreco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.vermelhoclaro,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.vermelhoclaro,
  },
  aceitarButton: {
    backgroundColor: theme.colors.vermelhoclaro,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  aceitarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressInfo: {
    marginTop: 15,
  },
  progressText: {
    fontSize: 14,
    color: theme.colors.gray,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.vermelhoclaro,
  },
});
