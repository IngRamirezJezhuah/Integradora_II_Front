import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from 'react-native/Libraries/NewAppScreen';
//import Home from '../screens/home';
//import Porfile from '../screens/porfile';
import Dashboard from '../screens/Dashboard';
import Muestras from '../screens/Muestras';
// import {  Escaner, Pedidos } from '../screens';
import Pedidos from '../screens/Pedidos';
import Escaner from '../screens/Escaner';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
            <Tab.Screen name="Escaner" component={Muestras} 
            options={{
                tabBarIcon: () =>(
                    <MaterialIcons name="qr-code-scanner" size={30} color={'#DA0C15'} />
                )
            }}/>
            
        </Tab.Navigator>
    );
};

export default TabNavigator;