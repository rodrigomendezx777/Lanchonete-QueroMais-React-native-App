import { View, Text, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, ScrollView} from "react-native"
import { theme } from "@/theme"
import { useRouter } from 'expo-router';

export default function Home() {

  const router = useRouter();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" style={styles.container}>
        
        <View style={styles.imageBox}>
          <Image source={require('../../../assets/images/LogoQueroMais.png')} style={styles.logo} resizeMode='contain' />
        </View>

        <View style={styles.containerPaiBrancoBemVindo}>
          <Text style={styles.title}>BEM-VINDO</Text>

          <TouchableOpacity style={styles.buttonLoja} onPress={() => router.push('/cadLoja')}>
            <Text style={styles.buttonTextLogin}>Sou Loja</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonMotorista} onPress={() => router.push('/cadMotorista')}>
            <Text style={styles.buttonTextCadastro}>Sou Motorista</Text>
          </TouchableOpacity>

        <View style={styles.iconBox}>
          <Image source={require('../../../assets/images/LogoQueroMais.png')} style={styles.icon} resizeMode='contain' />
        </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
 )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.vermelhoclaro ,
      },
    
      imageBox: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    
      },
    
      logo: {
        width: '80%',
        height: '80%',
        
      },
    
      containerPaiBrancoBemVindo: {
        flex: 2,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
        paddingHorizontal: '5%',
        
      },
    
      title: {
        fontSize: 40,
        color: theme.colors.vermelhoclaro,
        marginBottom: 40,
        fontFamily: theme.fontFamily.bold,
      },
    
      buttonLoja: {
        backgroundColor: theme.colors.vermelhoclaro ,
        borderColor: '#000000',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        elevation: 5,
        
      },
    
      buttonMotorista: {
        backgroundColor: theme.colors.white,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: '100%',
        borderWidth: 1.5,
        borderColor: theme.colors.vermelhoclaro,
        marginBottom: 10,
        elevation: 5,
      },
    
      buttonTextLogin: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: theme.fontFamily.medium
      },
    
      buttonTextCadastro: {
        color: theme.colors.vermelhoclaro,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: theme.fontFamily.medium
      },
    
      iconBox: {
        margin:10,
        justifyContent: 'center',
        alignItems: 'center',
    
      },
    
      icon: {
        width: 100,
        height: 50,
        resizeMode: 'cover',
      },
})