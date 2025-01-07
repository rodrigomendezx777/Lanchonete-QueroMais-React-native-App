import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView} from 'react-native';
import LoginForm from '../../components/SignupForm';
import { theme } from "@/theme"
import { useRouter } from 'expo-router';




 

export default function cadMotorista() {

 const router = useRouter();


  // Defina a função handleLogin que será passada para o LoginForm
  const handleLogin = (email: string, password: string) => {
    router.push('/dashMotorista')
    // Aqui você pode implementar a lógica para login, como validação ou API.
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/images/LogoQueroMais.png')} style={styles.logo} />
        </View>

        {/* Passando handleLogin como onLogin */}
        <LoginForm onLogin={handleLogin} destination="dashMotorista" />

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffff',

  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.vermelhoclaro,

    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 0,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
