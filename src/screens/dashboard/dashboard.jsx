import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './dashboard.styles';
import Home from '../home/home';
import Profile from '../profile/profile';
import Configuration from '../configuration/configuration';
import History from '../history/history';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


function CustomTabHeartButton({ children }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.customHeartButton}
            onPress={() => navigation.navigate('Frequency')}
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
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons style={styles.tabIcon} name="home-outline" size={24} color={focused ? '#fff' : '#aaa'} />
                    ),
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,

                }}
            />
            <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="time-outline" size={24} color={focused ? '#fff' : '#aaa'} />
                    ),
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,

                }}
            />
            <Tab.Screen
                name="Heart"
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="heart" size={28} color="#fff" />
                    ),
                    tabBarButton: (props) =>
                        <CustomTabHeartButton {...props} />,
                }}
            >
                {() => null}
            </Tab.Screen>
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="person-outline" size={24} color={focused ? '#fff' : '#aaa'} />
                    ),
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,
                }}
            />
            <Tab.Screen
                name="Configuration"
                component={Configuration}
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

