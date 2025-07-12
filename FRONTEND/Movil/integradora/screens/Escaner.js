import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ModalCodigo, Header, ModalMuestra } from '../components';
import { CameraView, Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const Escaner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sampleModalVisible, setSampleModalVisible] = useState(false);
  const [currentSample, setCurrentSample] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const fetchSampleById = async (sampleId) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        return;
      }

      const response = await fetch(`${API_URL}/muestras/${sampleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentSample(data.muestra || data);
        setSampleModalVisible(true);
        console.log('Muestra encontrada:', data);
      } else {
        Alert.alert('Error', 'No se encontró la muestra con ese ID');
        console.error('Error al buscar muestra:', response.status);
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión al buscar la muestra');
      console.error('Error al buscar muestra:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`Código escaneado (${type}): ${data}`);
    fetchSampleById(data);
  };

  const handleManualCodeSubmit = (codigo) => {
    console.log('Código ingresado manualmente:', codigo);
    setModalVisible(false);
    fetchSampleById(codigo);
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
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417'],
          }}
          style={styles.camera}
        />
      </View>
      
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
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
 