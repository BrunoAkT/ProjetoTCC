import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/dashboard/dashboard";
import Frequency from "../screens/frequency/frequency";
import Exercises from "../screens/exercises/exercises";
import { Colors, Fonts_Size, Fonts_Styles } from '../constants/theme'
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();


function RoutesOpen() {
    return <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: Colors.dark_gray },
            headerTintColor: '#fff',
            headerTitleStyle: { fontFamily: Fonts_Styles.PoppinsRegular },
        }}>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Frequency" component={Frequency} options={{
            headerTitle: () => (
                <View>
                    <Text style={{ fontSize: Fonts_Size.lg, fontFamily: Fonts_Styles.PoppinsRegular, color: Colors.gray }}>Frequência Cardíaca</Text>
                    <Text style={{ fontSize: Fonts_Size.sm, fontFamily: Fonts_Styles.PoppinsRegular, color: Colors.gray }}>Atual</Text>
                </View>
            ),
        }} />
        <Stack.Screen name="Exercises" component={Exercises} options={{
            headerTitle: () => (
                <View>
                    <Text style={{ fontSize: Fonts_Size.lg, fontFamily: Fonts_Styles.PoppinsRegular, color: Colors.gray }}>Exercícios</Text>
                </View>
            ),
        }} />
    </Stack.Navigator>;
}
export default RoutesOpen;