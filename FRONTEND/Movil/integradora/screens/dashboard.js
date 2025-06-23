import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Dashboard } from '../themes';


const dashboard = () => {
    return (
        <View style={Dashboard.container}>
        <Text>Dashboard</Text>
        <View style={Dashboard.caja_1}>
            <Text>Temperatura del Laboratorio </Text>
            <Text style={Dashboard.TextoAlerta}>25°C</Text>
        </View>
        <View style={Dashboard.caja_1}>
            <Text>Humedad del Laboratorio</Text>
            <Text style={Dashboard.TextoAlerta}>10%</Text>
        </View>
        <View style={Dashboard.caja_2}>
            <Text>contenedor #id</Text>
            <Text style={Dashboard.TextoAlerta}>Muestra Protegida</Text>
        </View>
        <View style={Dashboard.caja_3}>
            <Text>contenedor #id</Text>
            <Text style={Dashboard.TextoAlerta}>Precaucion</Text>
        </View>
        <StatusBar style="auto" />
        </View>
    );
}


export default dashboard