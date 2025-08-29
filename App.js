import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/routes";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light_Italic } from '@expo-google-fonts/poppins';
import { AuthProvider } from "./src/contexts/auth";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_800ExtraBold,
    Poppins_300Light_Italic
  });

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
