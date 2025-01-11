import { collection, addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface ItemPedido {
  id: string;
  name: string;
  price: number;
  quantity: number;
  checked?: boolean;
}

export interface Pedido {
  id?: string;
  items: ItemPedido[];
  endereco: string;
  observacoes?: string;
  totalPrice: number;
  status: 'pendente' | 'aceito' | 'em_andamento' | 'concluido';
  dataCriacao: string;
  motoristaId?: string;
}

// Criar novo pedido
export const criarPedido = async (pedido: Omit<Pedido, 'id'>) => {
  try {
    const pedidosRef = collection(db, 'pedidos');
    const docRef = await addDoc(pedidosRef, pedido);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw error;
  }
};

// Buscar pedidos pendentes (para motoristas)
export const buscarPedidosPendentes = async () => {
  try {
    const pedidosRef = collection(db, 'pedidos');
    const q = query(pedidosRef, where('status', '==', 'pendente'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Pedido[];
  } catch (error) {
    console.error('Erro ao buscar pedidos pendentes:', error);
    throw error;
  }
};

// Aceitar pedido (motorista)
export const aceitarPedido = async (pedidoId: string, motoristaId: string) => {
  try {
    const pedidoRef = doc(db, 'pedidos', pedidoId);
    await updateDoc(pedidoRef, {
      status: 'aceito',
      motoristaId
    });
  } catch (error) {
    console.error('Erro ao aceitar pedido:', error);
    throw error;
  }
};

// Atualizar status do item (checked)
export const atualizarStatusItem = async (pedidoId: string, items: ItemPedido[]) => {
  try {
    const pedidoRef = doc(db, 'pedidos', pedidoId);
    await updateDoc(pedidoRef, {
      items,
      status: items.every(item => item.checked) ? 'concluido' : 'em_andamento'
    });
  } catch (error) {
    console.error('Erro ao atualizar status do item:', error);
    throw error;
  }
}; 