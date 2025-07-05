import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const SamplesTable = ({ data, onView, onDelete }) => {
  const handleViewSample = (sample) => {
    if (onView) {
      onView(sample);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTipoMuestra = (tipo) => {
    if (!tipo) return 'N/A';
    if (tipo.toLowerCase().includes('quimicasanguinea')) return 'Química Sanguínea';
    if (tipo.toLowerCase().includes('biometriahematica')) return 'Biometría Hemática';
    return tipo;
  };

  const getImageSource = (tipoMuestra) => {
    if (!tipoMuestra) {
        //eslint-disable-next-line
      return require('../../assets/biometriahematica.png');
    }
    const tipo = tipoMuestra.toLowerCase().replace(/\s+/g, '');
    if (tipo.includes('quimicasanguinea') || tipo.includes('quimica')) {
        //eslint-disable-next-line
      return require('../../assets/quimicasanguinea.png');
    } else if (tipo.includes('biometriahematica') || tipo.includes('biometria')) {
        //eslint-disable-next-line
      return require('../../assets/biometriahematica.png');
    } else {
        //eslint-disable-next-line
      return require('../../assets/biometriahematica.png');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id || item.id}
        showsVerticalScrollIndicator={false}
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
              <Text style={styles.patientText}>{formatTipoMuestra(item.tipoMuestra)}</Text>
              <Text style={styles.patientName}>Paciente: {item.nombrePaciente || 'N/A'}</Text>
              <Text style={styles.dateText}>Fecha: {formatDate(item.createDate)}</Text>
              <Text style={styles.statusText}>
                Estado: {item.status ? '✅ Completado' : '⏳ Pendiente'}
              </Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleViewSample(item)}>
                <Ionicons name="search-outline" size={25} color="#DA0C15" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(item)}>
                <Ionicons name="download-outline" size={25} color="#DA0C15" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
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
    width: 40,
    height: 40,
  },
  dataContainer: {
    flex: 1,
    paddingRight: 10,
  },
  patientText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  patientName: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  statusText: {
    fontSize: 12,
    color: '#27AE60',
    fontWeight: '500',
  },
  actionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginVertical: 2,
    marginHorizontal: 2,
  },
});

SamplesTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    tipoMuestra: PropTypes.string,
    createDate: PropTypes.string,
  })).isRequired,
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SamplesTable;