import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ComboBoxSample from './comboBoxSample';
import { InputGroup } from '../';
import { useFocusField } from '../../hooks';
import { API_URL } from '@env';

const nuevaMuestra = ({ isVisible, onClose, onSubmit, orderData }) => {
  const [selectedTipo, setSelectedTipo] = useState('');
  const [pedido, setPedido] = useState('');
  const [pacienteId, setPacienteId] = useState('');
  const [nombre, setNombre] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [loading, setLoading] = useState(false);

  // Hook para manejar el focus de los campos
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();

  // Función para determinar el tipo de muestra basado en el análisis
  const determinarTipoMuestra = (analisis) => {
    if (!analisis || analisis.length === 0) return '';
    
    // Si solo hay un análisis, devolver su tipo
    if (analisis.length === 1) {
      const nombreAnalisis = analisis[0].nombre;
      if (nombreAnalisis === 'Quimica Sanguinea') return 'Quimica Sanguinea';
      if (nombreAnalisis === 'Biometria Hematica') return 'Biometria Hematica';
      return nombreAnalisis;
    }
    
    // Si hay múltiples análisis, priorizar según algún criterio
    // Por ejemplo, si hay Química Sanguínea, priorizarla
    const tieneQuimica = analisis.some(a => a.nombre === 'Quimica Sanguinea');
    const tieneBiometria = analisis.some(a => a.nombre === 'Biometria Hematica');
    
    if (tieneQuimica && tieneBiometria) {
      // Si tiene ambos, usar Química Sanguínea por defecto
      return 'Quimica Sanguinea';
    }
    
    if (tieneQuimica) return 'Quimica Sanguinea';
    if (tieneBiometria) return 'Biometria Hematica';
    
    // Si no hay ninguno de los dos tipos conocidos, usar el primero
    return analisis[0].nombre;
  };

  // Efecto para llenar los campos cuando se reciben datos del pedido
  useEffect(() => {
    if (orderData && isVisible) {
      // Determinar tipo de muestra basado en el análisis
      const tipoMuestra = determinarTipoMuestra(orderData.analisis);
      setSelectedTipo(tipoMuestra);
      
      // Llenar pedido ID
      setPedido(orderData._id || '');
      
      // Llenar paciente ID
      setPacienteId(orderData.usuarioId?._id || '');
      
      // Llenar nombre del paciente (solo el campo nombre)
      setNombre(orderData.usuarioId?.nombre || '');
      
      // Limpiar observaciones
      setObservaciones('');
    }
  }, [orderData, isVisible]);

  // Limpiar campos cuando se cierra el modal
  useEffect(() => {
    if (!isVisible) {
      setSelectedTipo('');
      setPedido('');
      setPacienteId('');
      setNombre('');
      setObservaciones('');
    }
  }, [isVisible]);

  const handleSubmit = async () => {
    // Validaciones
    if (!selectedTipo) {
      Alert.alert('Error', 'Por favor, selecciona un tipo de muestra');
      return;
    }
    
    if (!pedido || !pacienteId || !nombre) {
      Alert.alert('Error', 'Faltan datos del pedido o paciente');
      return;
    }

    setLoading(true);

    try {
      // Obtener el token del AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        setLoading(false);
        return;
      }

      // Mapear el tipo de muestra al formato del backend
      const tipoMuestraMap = {
        'Quimica Sanguinea': 'quimicaSanguinea',
        'Biometria Hematica': 'biometriaHematica',
        'quimicaSanguinea': 'quimicaSanguinea',
        'biometriaHematica': 'biometriaHematica'
      };

      const tipoMuestraBackend = tipoMuestraMap[selectedTipo] || selectedTipo;

      // Preparar los datos para enviar al backend
      const muestraData = {
        observaciones: observaciones || '',
        nombrePaciente: nombre,
        idusuario: pacienteId,
        tipoMuestra: tipoMuestraBackend,
        pedidoId: pedido
      };

      // Enviar petición al backend
      const response = await fetch(`${API_URL}/muestras`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(muestraData),
      });

      if (response.ok) {
        await response.json(); // Consumir la respuesta
        Alert.alert('Éxito', 'Muestra registrada correctamente');
        
        // Llamar al callback original si existe
        if (onSubmit) {
          onSubmit({ selectedTipo, pedido, pacienteId, nombre, observaciones });
        }
        
        onClose();
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        Alert.alert('Error', 'Error al registrar la muestra. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar muestra:', error);
      Alert.alert('Error', 'Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Registrar Muestra</Text>

        <ComboBoxSample 
          onSelect={setSelectedTipo} 
          selectedValue={selectedTipo}
        />

        <InputGroup
          labelTitle="Pedido"
          value={pedido}
          onChangeText={setPedido}
          placeholder="ID del pedido"
          onFocus={() => setFocus('pedido')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('pedido', {}, styles.inputFocus),
            styles.inputDisabled
          ]}
          keyboardType="default"
          editable={false}
        />

        <InputGroup
          labelTitle="ID del Paciente"
          value={pacienteId}
          onChangeText={setPacienteId}
          placeholder="Identificador del paciente"
          onFocus={() => setFocus('pacienteId')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('pacienteId', {}, styles.inputFocus),
            styles.inputDisabled
          ]}
          keyboardType="default"
          editable={false}
        />

        <InputGroup
          labelTitle="Nombre del Paciente"
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre completo del paciente"
          onFocus={() => setFocus('nombre')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('nombre', {}, styles.inputFocus),
            styles.inputDisabled
          ]}
          keyboardType="default"
          editable={false}
        />

        <InputGroup
          labelTitle="Observaciones"
          value={observaciones}
          onChangeText={setObservaciones}
          placeholder="Observaciones adicionales sobre la muestra"
          multiline={true}
          numberOfLines={4}
          onFocus={() => setFocus('observaciones')}
          onBlur={clearFocus}
          style={getFieldStyle('observaciones', {}, styles.inputFocus)}
          keyboardType="default"
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Registrando...' : 'Registrar Muestras'}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  backArrow: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  inputFocus: {
    borderColor: '#BF1E2D',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    color: '#666',
  },
  button: {
    backgroundColor: '#BF1E2D',
    padding: 14,
    borderRadius: 10,
    marginTop: 10
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

// PropTypes para validación
nuevaMuestra.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  orderData: PropTypes.shape({
    _id: PropTypes.string,
    analisis: PropTypes.arrayOf(PropTypes.shape({
      nombre: PropTypes.string,
      precio: PropTypes.number,
      descripcion: PropTypes.string,
    })),
    usuarioId: PropTypes.shape({
      _id: PropTypes.string,
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
      correo: PropTypes.string,
    }),
  }),
};

export default nuevaMuestra;
