import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

type LoginFormProps = {
  tipo: 'loja' | 'motorista';
};

export default function LoginForm({ tipo }: LoginFormProps) {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Por favor, insira um email válido.');
      return false;
    }

    if (password.length < 8) {
      setErrorMessage('A senha deve ter pelo menos 8 caracteres.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        if (isLogin) {
          await signIn(email, password);
        } else {
          await signUp(email, password, tipo);
        }
        
        // Redirecionar baseado no tipo de usuário
        router.push(tipo === 'loja' ? '/dashLoja' : '/dashMotorista');
      } catch (error: any) {
        Alert.alert('Erro', error.message);
      }
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>{isLogin ? 'Faça Login' : 'Cadastre-se'}</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A1A1A1"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#A1A1A1"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => router.push("/ForgotPasswordScreen")}>
        <Text style={styles.forgotPasswordText}>Recuperar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>{isLogin ? 'Entrar' : 'Cadastrar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    paddingVertical: '14.5%',
    paddingHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 42,

  },
  title: {
    fontSize: 30,
    color: theme.colors.vermelhoclaro,
    fontFamily: theme.fontFamily.medium,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
    color: 'black',
  },

    forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#1D1A7A',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: theme.colors.vermelhoclaro,
    width: '100%',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  toggleButton: {
    marginTop: 20,
  },
  toggleButtonText: {
    color: theme.colors.vermelhoclaro,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
