import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/dashboard/dashboard";

const Stack = createNativeStackNavigator();


function RoutesOpen(){
    return <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}}/>
    </Stack.Navigator>;
}
export default RoutesOpen;