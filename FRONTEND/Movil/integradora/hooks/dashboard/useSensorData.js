import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const useSensorData = () => {
  const [ldrData, setLdrData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSensorData = async () => {
    try {
      setLoading(true);
      setError(null);
      
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
        console.log('✅ Datos LDR obtenidos:', ldrResult);
      } else {
        console.error('❌ Error al obtener datos LDR:', ldrResponse.status);
        setError(`Error LDR: ${ldrResponse.status}`);
      }

      // Fetch Temperature and Humidity data
      const tempResponse = await fetch(`${API_URL}/tempwet/esp32c3_001`, {
        method: 'GET',
        headers,
      });

      if (tempResponse.ok) {
        const tempResult = await tempResponse.json();
        setTempData(tempResult);
        console.log('✅ Datos de temperatura obtenidos:', tempResult);
      } else {
        console.error('❌ Error al obtener datos de temperatura:', tempResponse.status);
        setError(`Error Temperatura: ${tempResponse.status}`);
      }

    } catch (error) {
      console.error('❌ Error al obtener datos de sensores:', error);
      setError('Error de conexión con los sensores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
    
    // Actualizar datos cada 30 segundos
    const interval = setInterval(fetchSensorData, 30000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    fetchSensorData();
  };

  return {
    ldrData,
    tempData,
    loading,
    error,
    refreshData,
  };
};
