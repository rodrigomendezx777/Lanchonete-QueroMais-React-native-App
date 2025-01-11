import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export interface Usuario {
  uid: string;
  email: string;
  tipo: 'loja' | 'motorista';
  nome?: string;
}

// Função para criar usuário
export const criarUsuario = async (email: string, senha: string, tipo: 'loja' | 'motorista') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    
    // Salvar informações adicionais do usuário
    const userRef = doc(db, 'usuarios', userCredential.user.uid);
    await setDoc(userRef, {
      email,
      tipo,
      dataCriacao: new Date().toISOString()
    });

    return userCredential.user;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este email já está em uso');
    }
    throw error;
  }
};

// Função para fazer login
export const fazerLogin = async (email: string, senha: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    
    // Buscar tipo do usuário
    const userRef = doc(db, 'usuarios', userCredential.user.uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data() as Usuario;

    return {
      user: userCredential.user,
      tipo: userData.tipo
    };
  } catch (error: any) {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      throw new Error('Email ou senha incorretos');
    }
    throw error;
  }
}; 