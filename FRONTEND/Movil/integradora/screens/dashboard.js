import React, { useState, useEffect } from 'react'
import { Text, View, ActivityIndicator } from 'react-native';
import { DashboardStyles } from '../themes';
import AnimatedContent from '../utils/AnimatedContent';
import { Header } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';



const Dashboard = () => {
    const [ldrData, setLdrData] = useState(null);
    const [tempData, setTempData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                };
                
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }

                // Fetch LDR data
                const ldrResponse = await fetch(`${API_URL}/ldr/esp32c3_001`, {
                    method: 'GET',
                    headers,
                });

                if (ldrResponse.ok) {
                    const ldrResult = await ldrResponse.json();
                    setLdrData(ldrResult);
                } else {
                    console.error('Error al obtener datos LDR:', ldrResponse.status);
                }

                // Fetch Temperature and Humidity data
                const tempResponse = await fetch(`${API_URL}/tempwet/esp32c3_001`, {
                    method: 'GET',
                    headers,
                });

                if (tempResponse.ok) {
                    const tempResult = await tempResponse.json();
                    setTempData(tempResult);
                } else {
                    console.error('Error al obtener datos de temperatura:', tempResponse.status);
                }

            } catch (error) {
                console.error('Error al obtener datos de sensores:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSensorData();
        // Opcional: actualizar datos cada 30 segundos
        const interval = setInterval(fetchSensorData, 30000);

        return () => clearInterval(interval);
    }, []);

    const getLdrStatus = (ldr) => {
        if (ldr <= 600) return { estado: 'En peligro', style: DashboardStyles.cprecaucion };
        if (ldr <= 1500) return { estado: 'Protegida', style: DashboardStyles.cmuestra };
        return { estado: 'Echada a perder', style: DashboardStyles.cprecaucion };
    };

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