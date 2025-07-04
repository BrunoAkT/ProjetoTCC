import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './dashboard.styles'; // Adjust the import path as necessary
import Topcurve from '../../components/Topmidcurve';

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return <View>
        <Topcurve></Topcurve>
        <Text>Home</Text>
    </View>;
}
function HistoryScreen() {
    return <View>
        <Text>Histórico</Text>
    </View>;
}
function ProfileScreen() {
    return <View>
        <Text>Perfil</Text>
    </View>;
}
function SettingsScreen() {
    return <View>
        <Text>Configurações</Text>
    </View>;
}
function CenterActionScreen() {
    return <View>
        <Text>Ação Central</Text>
    </View>;
}

function CustomTabHeartButton({ children, onPress }) {
    return (
        <TouchableOpacity
            style={styles.customHeartButton}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.customHeartButtonInner}>{children}</View>
        </TouchableOpacity>
    );
}
function CustomTabBarButton({ children, onPress }) {
    return (
        <TouchableOpacity
            style={styles.customButton}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.customButtonInner}>{children}</View>
        </TouchableOpacity>
    );
}

function Dashboard() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: styles.tabBarStyle,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons style={styles.tabIcon} name="home-outline" size={24} color={focused ? '#fff' : '#aaa'} />
                    ),
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,

                }}
            />
            <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="time-outline" size={24} color={focused ? '#fff' : '#aaa'} />
                    ),
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,

                }}
            />
            <Tab.Screen
                name="Center"
                component={CenterActionScreen}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="heart" size={28} color="#fff" />
                    ),
                    tabBarButton: (props) => <CustomTabHeartButton {...props} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="person-outline" size={24} color={focused ? '#fff' : '#aaa'} />
                    ),
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="settings-outline" size={24} color={focused ? '#fff' : '#aaa'} />
                    ),
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,
                }}
            />
        </Tab.Navigator>
    );
}
export default Dashboard;

