import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';


type LoginFormProps = {
  onLogin: (email: string, password: string) => void;
  destination: 'dashLoja' | 'dashMotorista'; // Nova prop para indicar o destino
};



export default function LoginForm({ onLogin }: LoginFormProps) {

  const router = useRouter()


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
        // Validação de comprimento mínimo da senha
    if (password.length < 8) {
        setErrorMessage('A senha deve ter pelo menos 8 caracteres.');
        return false;
    }

    // // Validação de força da senha
    // const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!strongPasswordRegex.test(password)) {
    //     setErrorMessage('A senha deve conter uma letra maiúscula, um número e um caractere especial.');
    //     return false;
    // }



// Se todas as validações passarem
    setErrorMessage(''); // Limpa a mensagem de erro
    return true;
  };

  const handleLogin = () => {
    if (validateForm()) {
      onLogin(email, password);

    }


  };




  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Faça Login</Text>

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

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
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
});
