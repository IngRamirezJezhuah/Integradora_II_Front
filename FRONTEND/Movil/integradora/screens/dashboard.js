import React from 'react'
import { Text, View } from 'react-native';
import { DashboardStyles } from '../themes';
import AnimatedContent from '../utils/AnimatedContent';
import { Header } from '../components';



const Dashboard = () => {
    return (        
        <View style={DashboardStyles.container}>
            <Header title="Dashboard" />
            <View style={DashboardStyles.content}>
                <AnimatedContent>
                    <View style={[DashboardStyles.ctemperatura, DashboardStyles.caja]}>
                        <Text>Temperatura del Laboratorio </Text>
                        <Text style={DashboardStyles.TextoAlerta}>25°C</Text>
                    </View>
                </AnimatedContent>
                <AnimatedContent>
                    <View style={[DashboardStyles.chumedad, DashboardStyles.caja]}>
                        <Text>Humedad del Laboratorio</Text>
                        <Text style={DashboardStyles.TextoAlerta}>10%</Text>
                    </View>
                </AnimatedContent>
                <AnimatedContent>
                    <View style={[DashboardStyles.cmuestra, DashboardStyles.caja]}>
                        <Text>contenedor #id</Text>
                        <Text style={DashboardStyles.TextoAlerta}>Muestra Protegida</Text>
                    </View>
                </AnimatedContent>
                <AnimatedContent>
                    <View style={[DashboardStyles.cprecaucion, DashboardStyles.caja]}>
                        <Text>contenedor #id</Text>
                        <Text style={DashboardStyles.TextoAlerta}>Precaucion</Text>
                    </View>
                </AnimatedContent>
            </View>
        </View>
    );
}


export default Dashboard;