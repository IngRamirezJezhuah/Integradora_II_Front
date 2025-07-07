import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
//import Home from '../screens/home';
//import Porfile from '../screens/porfile';
// import {  Escaner, Pedidos } from '../screens';
import Dashboard from '../screens/Dashboard';
import Muestras from '../screens/Muestras';
import Pedidos from '../screens/Pedidos';
// import  Escaner  from '../screens/Escaner';
import PatientStack from './PatientStack';
import AuthStack from './AuthStack';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     checkAuthStatus();
    // }, []);

    // const checkAuthStatus = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('userToken');
    //         setIsAuthenticated(!!token);
    //     } catch (error) {
    //         console.error('Error checking auth status:', error);
    //         setIsAuthenticated(false);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // // Función para manejar el login exitoso
    // const handleLoginSuccess = () => {
    //     setIsAuthenticated(true);
    // };

    // // Función para manejar el logout
    // const handleLogout = async () => {
    //     try {
    //         await AsyncStorage.removeItem('userToken');
    //         setIsAuthenticated(false);
    //     } catch (error) {
    //         console.error('Error during logout:', error);
    //     }
    // };

    // if (isLoading) {
    //     // Puedes mostrar un splash screen aquí
    //     return null;
    // }

    // if (!isAuthenticated) {
    //     return <AuthStack onLoginSuccess={handleLoginSuccess} />;
    // }

    return (
        <Tab.Navigator>
            <Tab.Screen name="Monitoreo" component={Dashboard} 
            options={{
                tabBarIcon: () =>(
                    <Ionicons name="home-outline" size={30} color={'#DA0C15'}/>
                )
            }} />
            <Tab.Screen name="Pedidos" component={Pedidos} 
            options={{
                tabBarIcon: () =>(
                    <FontAwesome5 name="clipboard-list" size={25} color={'#DA0C15'}/>
                )
            }}/>
            <Tab.Screen name="Muestras" component={Muestras} 
            options={{
                tabBarIcon: () =>(
                    <Fontisto name="test-tube" size={26} color={'#DA0C15'}/>
                )
            }}/>
            <Tab.Screen name="Escaner" component={PatientStack} 
            options={{
                tabBarIcon: () =>(
                    <MaterialIcons name="qr-code-scanner" size={30} color={'#DA0C15'} />
                )
            }}/>
            
        </Tab.Navigator>
    );
};

// Exportar también la función de logout para uso en otros componentes
export { TabNavigator as default };
export const logout = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        // Aquí podrías agregar navegación adicional si es necesario
        return true;
    } catch (error) {
        console.error('Error during logout:', error);
        return false;
    }
};