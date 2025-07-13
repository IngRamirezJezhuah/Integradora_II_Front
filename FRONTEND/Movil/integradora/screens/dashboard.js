import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native';
import { DashboardStyles } from '../themes';
import AnimatedContent from '../utils/AnimatedContent';
import { Header } from '../components';
import { useSensorData, useLdrStatus } from '../hooks';



const Dashboard = () => {
    const { ldrData, tempData, loading, error } = useSensorData();
    const { getLdrStatus } = useLdrStatus();

    if (loading) {
        return (
            <View style={DashboardStyles.container}>
                <Header title="Dashboard" />
                <View style={[DashboardStyles.content, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color="#DA0C15" />
                    <Text style={{ marginTop: 10 }}>Cargando datos de sensores...</Text>
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={DashboardStyles.container}>
                <Header title="Dashboard" />
                <View style={[DashboardStyles.content, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ color: '#DA0C15', textAlign: 'center', marginBottom: 10 }}>
                        Error al cargar datos de sensores
                    </Text>
                    <Text style={{ color: '#666', textAlign: 'center' }}>
                        {error}
                    </Text>
                </View>
            </View>
        );
    }
    return (        
        <View style={DashboardStyles.container}>
            <Header title="Dashboard" />
            <View style={DashboardStyles.content}>
                <AnimatedContent>
                    <View style={[DashboardStyles.ctemperatura, DashboardStyles.caja]}>
                        <Text>Temperatura del Laboratorio</Text>
                        <Text style={DashboardStyles.TextoAlerta}>
                            {tempData?.temperatura ? `${tempData.temperatura}°C` : 'Sin datos'}
                        </Text>
                    </View>
                </AnimatedContent>
                <AnimatedContent>
                    <View style={[DashboardStyles.chumedad, DashboardStyles.caja]}>
                        <Text>Humedad del Laboratorio</Text>
                        <Text style={DashboardStyles.TextoAlerta}>
                            {tempData?.humedad ? `${tempData.humedad}%` : 'Sin datos'}
                        </Text>
                    </View>
                </AnimatedContent>
                <AnimatedContent>
                    <View style={[DashboardStyles.cmuestra, DashboardStyles.caja]}>
                        <Text>Sensor de Luz (LDR)</Text>
                        <Text style={DashboardStyles.TextoAlerta}>
                            {ldrData?.ldr ? `${ldrData.ldr}` : 'Sin datos'}
                        </Text>
                    </View>
                </AnimatedContent>
                <AnimatedContent>
                    <View style={[
                        ldrData?.ldr ? getLdrStatus(ldrData.ldr).style : DashboardStyles.cprecaucion, 
                        DashboardStyles.caja
                    ]}>
                        <Text>Estado de Muestra</Text>
                        <Text style={DashboardStyles.TextoAlerta}>
                            {ldrData?.ldr ? getLdrStatus(ldrData.ldr).estado : 'Verificando...'}
                        </Text>
                    </View>
                </AnimatedContent>
            </View>
        </View>
    );
}


export default Dashboard;