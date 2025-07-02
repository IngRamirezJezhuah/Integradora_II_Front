import React, { /* useEffect, useRef, */ useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Camera, CameraType } from 'expo-camera';
import ModalCodigo from '../components/samples/modalCodigo';

const Escaner = () => {
//   const [hasPermission, setHasPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

  const handleManualSubmit = (codigo) => {
    console.log('Código ingresado manualmente:', codigo);
    setModalVisible(false);
    // Aquí podrías buscar en tu backend, validar, etc.
  };

//   if (hasPermission === null) {
//     return <Text>Solicitando permisos de cámara...</Text>;
//   }

//   if (hasPermission === false) {
//     return <Text>Permiso de cámara denegado</Text>;
//   }

return (
    <View style={styles.container}>
        <Text style={styles.header}>Escanea el código</Text>
        {/* <Camera
            ref={cameraRef}
            style={styles.camera}
            
            type={CameraType.back} // Usa la cámara trasera
            ratio="16:9"
        /> */}

        <Text style={styles.subtext}>Escaneando...</Text>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Ingresar código</Text>
        </TouchableOpacity>

        <ModalCodigo
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={handleManualSubmit}
        />
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtext: {
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
  },
  camera: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#BF1E2D',
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Escaner;
