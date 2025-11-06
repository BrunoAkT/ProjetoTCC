import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/dashboard/dashboard";
import Frequency from "../screens/frequency/frequency";
import FrequencyBLE from "../screens/frequencyBLE/frequencyBLE";
import Exercises from "../screens/exercises/exercises";
import Statistics from "../screens/statistics/statistics";
import BaiQuestionario from "../screens/BAI/bai";
import { Colors, Fonts_Size, Fonts_Styles } from '../constants/theme'
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();


function RoutesPrivated() {
    return <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: Colors.dark_gray },
            headerTintColor: '#fff',
            headerTitleStyle: { fontFamily: Fonts_Styles.PoppinsRegular },
        }}>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Bai" component={BaiQuestionario} options={{ headerShown: false }} />

        <Stack.Screen name="Frequency" component={Frequency} options={{
            headerTitle: () => (
                <View>
                    <Text style={{ fontSize: Fonts_Size.lg, fontFamily: Fonts_Styles.PoppinsRegular, color: Colors.gray }}>Frequência Cardíaca</Text>
                    <Text style={{ fontSize: Fonts_Size.sm, fontFamily: Fonts_Styles.PoppinsRegular, color: Colors.gray }}>Atual</Text>
                </View>
            ),
        }} />
        <Stack.Screen name="FrequencyBLE" component={FrequencyBLE} options={{
            headerTitle: () => (
                <View>
                    <Text style={{ fontSize: Fonts_Size.lg, fontFamily: Fonts_Styles.PoppinsRegular, color: Colors.gray }}>Frequência Cardíaca2</Text>
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
        <Stack.Screen name="Statistics" component={Statistics} options={{
            headerTitle: () => (
                <View>
                    <Text style={{ fontSize: Fonts_Size.lg, fontFamily: Fonts_Styles.PoppinsRegular, color: Colors.gray }}>Estatísticas</Text>
                </View>
            ),
        }} />
    </Stack.Navigator>;
}
export default RoutesPrivated;