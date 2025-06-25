import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Dashboard } from '../themes';


const dashboard = () => {
    return (
        <View style={Dashboard.container}>
            <View style={[Dashboard.ctemperatura, Dashboard.caja]}>
                <Text>Temperatura del Laboratorio </Text>
                <Text style={Dashboard.TextoAlerta}>25°C</Text>
            </View>
            <View style={[Dashboard.chumedad, Dashboard.caja]}>
                <Text>Humedad del Laboratorio</Text>
                <Text style={Dashboard.TextoAlerta}>10%</Text>
            </View>
            <View style={[Dashboard.cmuestra, Dashboard.caja]}>
                <Text>contenedor #id</Text>
                <Text style={Dashboard.TextoAlerta}>Muestra Protegida</Text>
            </View>
            <View style={[Dashboard.cprecaucion, Dashboard.caja]}>
                <Text>contenedor #id</Text>
                <Text style={Dashboard.TextoAlerta}>Precaucion</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}


export default dashboard