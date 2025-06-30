import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../screens/account/account";
import Login from "../screens/login/login";

const Stack = createNativeStackNavigator();


function RoutesOpen(){
    return <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Account" component={Account} options={{headerShown: false}}/>
    </Stack.Navigator>;
}
export default RoutesOpen;