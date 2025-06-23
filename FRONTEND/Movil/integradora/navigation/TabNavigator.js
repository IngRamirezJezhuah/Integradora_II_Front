import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
//import Home from '../screens/home';
//import Porfile from '../screens/porfile';
import dashboard from '../screens/dashboard';
import Muestras from '../screens/Muestras';
import { Pedidos } from '../screens';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>

            
            <Tab.Screen name="Monitoreo" component={dashboard} 
            options={{
                tabBarIcon: () =>(
                    <Ionicons name="home-outline" size={30} color={'#62bec0'}/>
                )
            }} />
            <Tab.Screen name="Pedidos" component={Pedidos} 
            options={{
                tabBarIcon: () =>(
                    <Ionicons name="heart-half-outline" size={30} color={'#62bec0'}/>
                )
            }}/>
            <Tab.Screen name="Muestras" component={Muestras} 
            options={{
                tabBarIcon: () =>(
                    <Ionicons name="heart-half-outline" size={30} color={'#62bec0'}/>
                )
            }}/>
        </Tab.Navigator>
    );
};

export default TabNavigator;