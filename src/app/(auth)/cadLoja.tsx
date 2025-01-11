import React from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import LoginForm from '../../components/SignupForm';
import { theme } from "@/theme";

export default function CadLoja() {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/images/LogoQueroMais.png')} style={styles.logo} />
        </View>

        <LoginForm tipo="loja" />
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
