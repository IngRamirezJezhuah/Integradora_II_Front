import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import SampleModal from './modalMuestra';

const TablaMuestras = ({ data, onView, onDelete }) => {
    const [selectedSample, setSelectedSample] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleViewSample = (sample) => {
        setSelectedSample(sample);
        setModalVisible(true);
        // También ejecutar la función onView si existe
        if (onView) {
            onView(sample);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedSample(null);
    };
// const getIconSource = (tipo) => {
//     // Normaliza el nombre del tipo para que coincida con el nombre del archivo
//     // Ejemplo: "biometria hematica" -> "biometriahematica.png"
//     if (!tipo) return require('../../../assets/icon.png');
//     const iconName = tipo.replace(/\s+/g, '').toLowerCase() + '.png';
//     try {
//         return require(`../../../assets/${iconName}`);
//     } catch (e) {
//         return require('../../../assets/icon.png');
//     }
// };

    const getImageSource = (tipoMuestra) => {
        if (!tipoMuestra) {
            // eslint-disable-next-line
            return require('../../assets/biometriahematica.png'); // imagen por defecto
        }
        
        const tipo = tipoMuestra.toLowerCase().replace(/\s+/g, '');
        
        if (tipo.includes('quimicasanguinea') || tipo.includes('quimica')) {
            // eslint-disable-next-line
            return require('../../assets/quimicasanguinea.png');
        } else if (tipo.includes('biometriahematica') || tipo.includes('biometria')) {
            // eslint-disable-next-line
            return require('../../assets/biometriahematica.png');
        } else {
            // eslint-disable-next-line
            return require('../../assets/biometriahematica.png'); // imagen por defecto
        }
    };

const getStatusColor = (status) => {
    return status ? '#28A745' : '#FFC107'; // Verde para completado, amarillo para en proceso
};

const getStatusText = (status) => {
    return status ? 'Completado' : 'En Proceso';
};


return (
    <>
        <FlatList
            data={data}
            keyExtractor={(item) => item._id || item.id}
            renderItem={({ item }) => (
                <View style={styles.row}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={getImageSource(item.tipoMuestra)}
                            style={styles.typeIcon}
                            resizeMode="contain"
                        />
                    </View>
                    
                    <View style={styles.dataContainer}>
                        <View style={styles.headerRow}>
                            <Text style={styles.patientText}>{item.nombrePaciente || 'N/A'}</Text>
                        </View>
                            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                                <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
                            </View>
                    </View>
                    
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => handleViewSample(item)}>
                            <MaterialCommunityIcons name="file-search-outline" size={25} color="#DA0C15" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(item)}>
                            <MaterialCommunityIcons name="trash-can" size={25} color="#DA0C15" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
        
        {/* Modal para mostrar detalles de la muestra */}
        <SampleModal
            visible={modalVisible}
            sample={selectedSample}
            onClose={handleCloseModal}
        />
    </>
);
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeIcon: {
    width: 35,
    height: 35,
  },
  dataContainer: {
    flex: 1,
    paddingRight: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    width: 90,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  patientText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 3,
  },
  actionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginVertical: 2,
  },
});

// PropTypes para validación de props
TablaMuestras.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    nombrePaciente: PropTypes.string,
    tipoMuestra: PropTypes.string,
    status: PropTypes.bool,
    createDate: PropTypes.string,
    observaciones: PropTypes.string
  })).isRequired,
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TablaMuestras;
