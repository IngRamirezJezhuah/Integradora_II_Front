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
import PatientStack from './PatientStack';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

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
            
            if (!token) {
                console.log('❌ No hay token - usuario no autenticado');
                setIsAuthenticated(false);
                setUserRole(null);
                return;
            }

            // Obtener el rol del usuario
            let role = null;
            if (userData) {
                try {
                    const user = JSON.parse(userData);
                    role = user.role || user.rol || null;
                    console.log('👤 Rol del usuario:', role);
                    setUserRole(role);
                } catch (error) {
                    console.error('❌ Error parsing userData:', error);
                    setUserRole(null);
                }
            }

            // Verificar la validez del token con el servidor
            const isValidToken = await verifyTokenWithServer(token);
            
            const wasAuthenticated = isAuthenticated;
            const currentlyAuthenticated = isValidToken;
            
            console.log('📊 Estado anterior:', wasAuthenticated);
            console.log('📊 Estado actual:', currentlyAuthenticated);
            
            setIsAuthenticated(currentlyAuthenticated);
            
            // Si el token no es válido, limpiar el storage
            if (!isValidToken) {
                console.log('🚪 Token inválido - limpiando storage y redirigiendo a login');
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userData');
            }
            
            // Si el usuario estaba autenticado y ahora no, significa que se perdió la sesión
            if (wasAuthenticated && !currentlyAuthenticated) {
                console.log('🚪 Sesión expirada - redirigiendo a login');
            } else if (!wasAuthenticated && currentlyAuthenticated) {
                console.log('🎉 Usuario autenticado - mostrando aplicación');
            }
        } catch (error) {
            console.error('❌ Error checking auth status:', error);
            setIsAuthenticated(false);
            // En caso de error, también limpiar el storage por seguridad
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
        } finally {
            setIsLoading(false);
        }
    };

    // Función para verificar el token con el servidor
    const verifyTokenWithServer = async (token) => {
        try {
            console.log('🔐 Verificando token con el servidor...');
            
            // Verificación simple del formato JWT y expiración
            if (!token || !token.includes('.')) {
                console.log('❌ Token inválido - formato incorrecto');
                return false;
            }

            // Decodificar el payload del JWT para verificar expiración
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Math.floor(Date.now() / 1000);
                
                if (payload.exp && payload.exp < currentTime) {
                    console.log('❌ Token expirado');
                    return false;
                }
                
                console.log('✅ Token válido (verificación local)');
                return true;
            } catch (decodeError) {
                console.error('❌ Error decodificando token:', decodeError);
                return false;
            }

            // TODO: Implementar verificación con servidor cuando esté disponible
            // const response = await fetch(`${API_URL}/auth/verify-token`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`,
            //     },
            // });

            // if (response.ok) {
            //     console.log('✅ Token válido');
            //     return true;
            // } else {
            //     console.log('❌ Token inválido - Status:', response.status);
            //     return false;
            // }
        } catch (error) {
            console.error('❌ Error verificando token:', error);
            // En caso de error de red, asumir que el token es válido temporalmente
            // para evitar desloguear al usuario por problemas de conectividad
            return true;
        }
    };

    // Función para verificar token al cambiar de pestaña
    const handleTabPress = async (e, routeName) => {
        console.log(`🔄 Cambiando a pestaña: ${routeName}`);
        
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            console.log('❌ No hay token al cambiar pestaña');
            setIsAuthenticated(false);
            e.preventDefault(); // Prevenir el cambio de pestaña
            return;
        }

        const isValidToken = await verifyTokenWithServer(token);
        if (!isValidToken) {
            console.log('❌ Token inválido al cambiar pestaña');
            setIsAuthenticated(false);
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
            e.preventDefault(); // Prevenir el cambio de pestaña
            return;
        }

        console.log('✅ Token válido - permitiendo cambio de pestaña');
    };

    // Función para obtener las pestañas según el rol
    const getTabsForRole = (role) => {
        const allTabs = [
            {
                name: "Monitoreo",
                component: Dashboard,
                icon: () => <Ionicons name="home-outline" size={30} color={'#DA0C15'}/>,
                roles: ['admin', 'laboratory']
            },
            {
                name: "Pedidos", 
                component: Pedidos,
                icon: () => <FontAwesome5 name="clipboard-list" size={25} color={'#DA0C15'}/>,
                roles: ['admin', 'accounting']
            },
            {
                name: "Muestras",
                component: MuestrasScreen,
                icon: () => <Fontisto name="test-tube" size={26} color={'#DA0C15'}/>,
                roles: ['admin', 'laboratory']
            },
            {
                name: "Escaner",
                component: Escaner,
                icon: () => <MaterialIcons name="qr-code-scanner" size={30} color={'#DA0C15'} />,
                roles: ['admin', 'laboratory']
            },
            {
                name: "Pacientes",
                component: PatientStack,
                icon: () => <MaterialIcons name="qr-code-scanner" size={30} color={'#DA0C15'} />,
                roles: ['patient']
            }
        ];

        // Si no hay rol, no mostrar pestañas
        if (!role) {
            console.log('⚠️ No hay rol definido - no se mostrarán pestañas');
            return [];
        }

        // Filtrar pestañas según el rol
        const filteredTabs = allTabs.filter(tab => tab.roles.includes(role));
        console.log(`🔐 Pestañas para rol '${role}':`, filteredTabs.map(tab => tab.name));
        
        return filteredTabs;
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

    // Obtener las pestañas según el rol
    const allowedTabs = getTabsForRole(userRole);

    // Si no hay pestañas permitidas, mostrar mensaje o redirigir
    if (allowedTabs.length === 0) {
        console.log('❌ No hay pestañas permitidas para este rol');
        return <AuthStack onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown: false
            }}
        >
            {allowedTabs.map((tab) => (
                <Tab.Screen 
                    key={tab.name}
                    name={tab.name} 
                    component={tab.component} 
                    options={{
                        tabBarIcon: tab.icon
                    }}
                    listeners={{
                        tabPress: (e) => handleTabPress(e, tab.name)
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};


export { TabNavigator as default };
export const logout = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        return true;
    } catch (error) {
        console.error('❌ Error during logout:', error);
        return false;
    }
};