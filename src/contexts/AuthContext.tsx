import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Usuario, criarUsuario, fazerLogin } from '../services/auth';

interface AuthContextData {
  user: Usuario | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, tipo: 'loja' | 'motorista') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Buscar dados adicionais do usuário se necessário
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email!,
          tipo: 'loja', // Você precisará buscar isso do Firestore
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fazerLogin(email, password);
      setUser({
        uid: response.user.uid,
        email: response.user.email!,
        tipo: response.tipo,
      });
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, tipo: 'loja' | 'motorista') => {
    try {
      const firebaseUser = await criarUsuario(email, password, tipo);
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        tipo,
      });
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 