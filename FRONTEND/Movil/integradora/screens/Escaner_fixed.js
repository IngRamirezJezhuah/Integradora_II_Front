import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ModalCodigo, Header, ModalMuestra } from '../components';
import { CameraView, Camera } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const Escaner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sampleModalVisible, setSampleModalVisible] = useState(false);
  const [currentSample, setCurrentSample] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Hook para manejar el enfoque de la pantalla
  useFocusEffect(
    React.useCallback(() => {
      // Cuando la pantalla se enfoca, activar la cámara
      console.log('📷 Pantalla de escáner enfocada - Activando cámara');
      setIsCameraActive(true);
      setScanned(false); // Reset del estado de escaneo

      // Cuando la pantalla se desenfoca, desactivar la cámara
      return () => {
        console.log('📷 Pantalla de escáner desenfocada - Desactivando cámara');
        setIsCameraActive(false);
      };
    }, [])
  );

  const fetchSampleById = async (sampleId) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        return;
      }

      console.log(`🔍 Buscando muestra con ID: ${sampleId}`);
      console.log(`📡 Endpoint: ${API_URL}/muestras/detalle/${sampleId}`);

      const response = await fetch(`${API_URL}/muestras/detalle/${sampleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log(`📊 Respuesta del servidor - Status: ${response.status}`);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Muestra encontrada:', data);
        setCurrentSample(data.muestra || data);
        setSampleModalVisible(true);
      } else {
        // Intenta obtener el mensaje de error del servidor
        let errorMessage = 'No se encontró la muestra con ese ID';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.error('❌ Error del servidor:', errorData);
        } catch (e) {
          console.error('❌ Error al parsear respuesta de error:', e);
        }
        
        Alert.alert('Error', `${errorMessage} (Código: ${response.status})`);
        console.error('❌ Error al buscar muestra - Status:', response.status);
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión al buscar la muestra');
      console.error('❌ Error de conexión al buscar muestra:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`📱 Código escaneado (${type}): ${data}`);
    fetchSampleById(data);
  };

  const handleManualCodeSubmit = (codigo) => {
    console.log('⌨️ Código ingresado manualmente:', codigo);
    setModalVisible(false);
    fetchSampleById(codigo);
  };

  const handleScanAgain = () => {
    console.log('🔄 Reiniciando escáner');
    setScanned(false);
    setIsCameraActive(true);
  };

  const handleCloseSampleModal = () => {
    setSampleModalVisible(false);
    setCurrentSample(null);
  };

  if (hasPermission === null) return <Text>Solicitando permisos...</Text>;
  if (hasPermission === false) return <Text>Permiso de cámara denegado</Text>;

  return (
    <View style={styles.container}>
      <Header title="Escanear Código" />
      <Text style={styles.header}>Escanea el código QR de la muestra</Text>
      
      <View style={styles.cameraContainer}>
        {isCameraActive ? (
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'pdf417'],
            }}
            style={styles.camera}
          />
        ) : (
          <View style={styles.cameraInactive}>
            <Text style={styles.cameraInactiveText}>
              Cámara inicializando...
            </Text>
          </View>
        )}
      </View>
      
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={handleScanAgain}>
          <Text style={styles.buttonText}>Escanear de nuevo</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Ingresar código manualmente</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Buscando muestra...</Text>
        </View>
      )}

      {/* Modal para ingresar código manualmente */}
      <ModalCodigo
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleManualCodeSubmit}
      />

      {/* Modal para mostrar información de la muestra */}
      <ModalMuestra
        visible={sampleModalVisible}
        sample={currentSample}
        onClose={handleCloseSampleModal}
        showRegisterButton={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  cameraContainer: { 
    width: '100%', 
    height: 300, 
    borderRadius: 20, 
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#000',
  },
  camera: { 
    flex: 1,
  },
  cameraInactive: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraInactiveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  button: { marginTop: 20, backgroundColor: '#BF1E2D', padding: 14, borderRadius: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  loadingContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});

export default Escaner;
