import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import PropTypes from 'prop-types';
import {QuimSangResultados,BiomHemResultados } from '../../components';

const ModalMuestra = ({ visible, sample, onClose, showRegisterButton = true }) => {
  const [showQuimModal, setShowQuimModal] = useState(false);
  const [showBiomModal, setShowBiomModal] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    return status ? '#28A745' : '#FFC107';
  };

  const getStatusText = (status) => {
    return status ? 'Completado' : 'En Proceso';
  };

  const handleRegistrarResultado = () => {
    if (!sample || !sample.tipoMuestra) {
      console.warn('No se puede determinar el tipo de muestra');
      return;
    }

    const tipo = sample.tipoMuestra.toLowerCase().replace(/\s+/g, '');
    
    if (tipo.includes('quimicasanguinea') || tipo.includes('quimica')) {
      setShowQuimModal(true);
      // console.log('Abriendo modal de Química Sanguínea para:', sample._id);
    } else if (tipo.includes('biometriahematica') || tipo.includes('biometria')) {
      setShowBiomModal(true);
      // console.log('Abriendo modal de Biometría Hemática para:', sample._id);
    } else {
      console.warn('Tipo de muestra no reconocido:', sample.tipoMuestra);
    }
  };
  //acomodar imagen biometiahematica y quimicasanguinea

  const handleCloseQuimModal = () => {
    setShowQuimModal(false);
  };

  const handleCloseBiomModal = () => {
    setShowBiomModal(false);
  };

  if (!sample) return null;

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} swipeDirection="down" style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView>
          <View style={styles.iconContainer}>
            <Ionicons name="flask" size={48} color="#DA0C15" />
            <Text style={styles.idText}>ID: {sample._id ? sample._id.slice(-8) : 'N/A'}</Text>
          </View>

          <Text style={styles.label}>Paciente</Text>
          <Text style={styles.value}>{sample.nombrePaciente || 'N/A'}</Text>

          <Text style={styles.label}>Tipo de Muestra</Text>
          <Text style={styles.value}>{sample.tipoMuestra || 'N/A'}</Text>

          <Text style={styles.label}>Estado</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(sample.status) }]}>
            <Text style={styles.statusText}>{getStatusText(sample.status)}</Text>
          </View>

          <Text style={styles.label}>Fecha de Creación</Text>
          <Text style={styles.value}>{formatDate(sample.createDate)}</Text>

          {sample.observaciones && (
            <>
              <Text style={styles.label}>Observaciones</Text>
              <Text style={styles.value}>{sample.observaciones}</Text>
            </>
          )}

          {sample.pedidoId && (
            <>
              <Text style={styles.label}>ID del Pedido</Text>
              <Text style={styles.value}>{sample.pedidoId}</Text>
            </>
          )}
          {sample._id && (
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <Text style={styles.label}>Código QR</Text>
              <QRCode value={sample._id} size={150} />
            </View>
          )}
        </ScrollView>
        
        {showRegisterButton && (
          <TouchableOpacity style={styles.button} onPress={handleRegistrarResultado}>
            <Text style={styles.buttonText}>Registrar Resultado</Text>
          </TouchableOpacity>
        )}

        {/* Modales de resultados */}
        <QuimSangResultados
          visible={showQuimModal}
          sample={sample}
          onClose={handleCloseQuimModal}
        />
        
        <BiomHemResultados
          visible={showBiomModal}
          sample={sample}
          onClose={handleCloseBiomModal}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  backArrow: {
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  idText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  value: {
    fontSize: 15,
    marginBottom: 5,
    color: '#555',
  },
  button: {
    backgroundColor: '#DA0C15',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

// PropTypes para validación de props
ModalMuestra.propTypes = {
  visible: PropTypes.bool.isRequired,
  sample: PropTypes.shape({
    _id: PropTypes.string,
    nombrePaciente: PropTypes.string,
    tipoMuestra: PropTypes.string,
    status: PropTypes.bool,
    createDate: PropTypes.string,
    observaciones: PropTypes.string,
    pedidoId: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  showRegisterButton: PropTypes.bool
};

export default ModalMuestra;
