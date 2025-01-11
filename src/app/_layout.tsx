import { theme } from "@/theme"
import { Slot } from "expo-router"
import { StatusBar } from "react-native"
import {GestureHandlerRootView} from "react-native-gesture-handler"
import * as SplashScreen from "expo-splash-screen"
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';


import {
     useFonts,
     Roboto_400Regular,
     Roboto_500Medium,
     Roboto_700Bold
    } from "@expo-google-fonts/roboto"

SplashScreen.preventAutoHideAsync()

// <StatusBar barStyle="light-content" backgroundColor = "black" />
export default function Layout(){
const [fontLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold
    })

if(fontLoaded){
    SplashScreen.hideAsync()
}

    return(
        <AuthProvider>
            <CartProvider>
                <GestureHandlerRootView style={{flex: 1}}>
                    <StatusBar barStyle="light-content" backgroundColor = "#da0505" />  
                    { fontLoaded && <Slot />}
                </GestureHandlerRootView>
            </CartProvider>
        </AuthProvider>
    )
}