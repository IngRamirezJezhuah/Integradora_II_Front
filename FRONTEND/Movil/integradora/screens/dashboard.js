import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { DashboardStyles } from '../themes';


const Dashboard = () => {
    return (
        <View style={DashboardStyles.container}>
            <View style={[DashboardStyles.ctemperatura, DashboardStyles.caja]}>
                <Text>Temperatura del Laboratorio </Text>
                <Text style={DashboardStyles.TextoAlerta}>25°C</Text>
            </View>
            <View style={[DashboardStyles.chumedad, DashboardStyles.caja]}>
                <Text>Humedad del Laboratorio</Text>
                <Text style={DashboardStyles.TextoAlerta}>10%</Text>
            </View>
            <View style={[DashboardStyles.cmuestra, DashboardStyles.caja]}>
                <Text>contenedor #id</Text>
                <Text style={DashboardStyles.TextoAlerta}>Muestra Protegida</Text>
            </View>
            <View style={[DashboardStyles.cprecaucion, DashboardStyles.caja]}>
                <Text>contenedor #id</Text>
                <Text style={DashboardStyles.TextoAlerta}>Precaucion</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}


export default Dashboard;