import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import PropTypes from 'prop-types';
import { QuimSangResultados, BiomHemResultados, ResultadosView } from '../../components';
import { useModalMuestra } from '../../hooks';

const ModalMuestra = ({ visible, sample, onClose, showRegisterButton = true }) => {
  const {
    showQuimModal,
    showBiomModal,
    sampleData,
    handleRegistrarResultado,
    handleCloseQuimModal,
    handleCloseBiomModal
  } = useModalMuestra(sample);

  if (!sampleData) return null;

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} swipeDirection="down" style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView>
          <View style={styles.iconContainer}>
            <Ionicons name="flask" size={48} color="#DA0C15" />
            <Text style={styles.idText}>ID: {sampleData.id}</Text>
          </View>

          <Text style={styles.label}>Paciente</Text>
          <Text style={styles.value}>{sampleData.nombrePaciente}</Text>

          <Text style={styles.label}>Tipo de Muestra</Text>
          <Text style={styles.value}>{sampleData.tipoMuestra}</Text>

          <Text style={styles.label}>Estado</Text>
          <View style={[styles.statusBadge, { backgroundColor: sampleData.statusColor }]}>
            <Text style={styles.statusText}>{sampleData.statusText}</Text>
          </View>

          <Text style={styles.label}>Fecha de Creación</Text>
          <Text style={styles.value}>{sampleData.createDate}</Text>

          {sampleData.hasObservaciones && (
            <>
              <Text style={styles.label}>Observaciones</Text>
              <Text style={styles.value}>{sampleData.observaciones}</Text>
            </>
          )}

          {sampleData.hasPedidoId && (
            <>
              <Text style={styles.label}>ID del Pedido</Text>
              <Text style={styles.value}>{sampleData.pedidoId}</Text>
            </>
          )}
          
          {sampleData.hasQrCode && (
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <Text style={styles.label}>Código QR</Text>
              <QRCode value={sampleData.qrValue} size={150} />
            </View>
          )}

          {/* Mostrar resultados si están disponibles */}
          <ResultadosView sample={sample} />
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
