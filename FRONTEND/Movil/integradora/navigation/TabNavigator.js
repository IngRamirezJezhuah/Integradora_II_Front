import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dashboard, Escaner, Pedidos} from '../screens';
import MuestrasScreen from '../screens/Muestras';
import AuthStack from './AuthStack';
// import PatientStack from './PatientStack';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
        
        // Verificar el estado de autenticación cada vez que la app se enfoque
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'active') {
                checkAuthStatus();
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        
        // Verificar periódicamente el estado de autenticación (más frecuente para logout)
        const interval = setInterval(checkAuthStatus, 3000); // Cada 3 segundos
        
        return () => {
            subscription?.remove();
            clearInterval(interval);
        };
    }, []);

    const checkAuthStatus = async () => {
        try {
            console.log('🔍 Verificando estado de autenticación...');
            const token = await AsyncStorage.getItem('userToken');
            const userData = await AsyncStorage.getItem('userData');
            
            console.log('🔑 Token encontrado:', token ? 'Sí' : 'No');
            console.log('👤 Datos de usuario encontrados:', userData ? 'Sí' : 'No');
            
            const wasAuthenticated = isAuthenticated;
            const currentlyAuthenticated = !!token;
            
            console.log('📊 Estado anterior:', wasAuthenticated);
            console.log('📊 Estado actual:', currentlyAuthenticated);
            
            setIsAuthenticated(currentlyAuthenticated);
            
            // Si el usuario estaba autenticado y ahora no, significa que se hizo logout
            if (wasAuthenticated && !currentlyAuthenticated) {
                console.log('🚪 Usuario desautenticado - redirigiendo a login');
            } else if (!wasAuthenticated && currentlyAuthenticated) {
                console.log('🎉 Usuario autenticado - mostrando aplicación');
            }
        } catch (error) {
            console.error('❌ Error checking auth status:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para manejar el login exitoso
    const handleLoginSuccess = () => {
        console.log('🎯 Login exitoso recibido en TabNavigator');
        setIsAuthenticated(true);
    };

    if (isLoading) {
        console.log('⏳ Cargando estado de autenticación...');
        // Puedes mostrar un splash screen aquí
        return null;
    }

    if (!isAuthenticated) {
        console.log('🚪 Usuario no autenticado - mostrando AuthStack');
        return <AuthStack onLoginSuccess={handleLoginSuccess} />;
    }

    console.log('✅ Usuario autenticado - mostrando TabNavigator');

    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
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
            <Tab.Screen name="Muestras" component={MuestrasScreen} 
            options={{
                tabBarIcon: () =>(
                    <Fontisto name="test-tube" size={26} color={'#DA0C15'}/>
                )
            }}/>
            <Tab.Screen name="Escaner" component={Escaner} 
            options={{
                tabBarIcon: () =>(
                    <MaterialIcons name="qr-code-scanner" size={30} color={'#DA0C15'} />
                )
            }}/>
            
        </Tab.Navigator>
    );
};


export { TabNavigator as default };
export const logout = async () => {
    try {
        console.log('🚪 Iniciando proceso de logout...');
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        console.log('✅ Datos de sesión eliminados correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error during logout:', error);
        return false;
    }
};