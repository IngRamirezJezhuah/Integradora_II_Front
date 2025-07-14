import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useResultadosView } from '../../hooks';

const ResultadosView = ({ sample }) => {
  const {
    shouldShowResults,
    sampleType,
    quimicaData,
    biometriaData
  } = useResultadosView(sample);

  if (!shouldShowResults) {
    return null;
  }

  const renderQuimicaSanguinea = (data) => {
    if (!data) return null;

    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}> Resultados - Química Sanguínea</Text>
        <View style={styles.resultsGrid}>
          {data.resultados.map((resultado) => (
            <View key={resultado.key} style={styles.resultItem}>
              <Text style={styles.resultLabel}>{resultado.label}:</Text>
              <Text style={styles.resultValue}>{resultado.value} {resultado.unit}</Text>
            </View>
          ))}
        </View>
        {data.observaciones && (
          <View style={styles.observacionesContainer}>
            <Text style={styles.observacionesTitle}>Observaciones:</Text>
            <Text style={styles.observacionesText}>{data.observaciones}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderBiometriaHematica = (data) => {
    if (!data) return null;

    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Resultados - Biometría Hemática</Text>
        
        {data.formulaRoja.length > 0 && (
          <View style={styles.formulaSection}>
            <Text style={styles.formulaTitle}>Fórmula Roja</Text>
            <View style={styles.resultsGrid}>
              {data.formulaRoja.map((resultado) => (
                <View key={resultado.key} style={styles.resultItem}>
                  <Text style={styles.resultLabel}>{resultado.label}:</Text>
                  <Text style={styles.resultValue}>{resultado.value} {resultado.unit}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.formulaBlanca.length > 0 && (
          <View style={styles.formulaSection}>
            <Text style={styles.formulaTitle}>Fórmula Blanca</Text>
            <View style={styles.resultsGrid}>
              {data.formulaBlanca.map((resultado) => (
                <View key={resultado.key} style={styles.resultItem}>
                  <Text style={styles.resultLabel}>{resultado.label}:</Text>
                  <Text style={styles.resultValue}>{resultado.value} {resultado.unit}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.observaciones && (
          <View style={styles.observacionesContainer}>
            <Text style={styles.observacionesTitle}>Observaciones:</Text>
            <Text style={styles.observacionesText}>{data.observaciones}</Text>
          </View>
        )}
      </View>
    );
  };

  // Renderizar según el tipo de muestra
  if (sampleType === 'quimica') {
    return renderQuimicaSanguinea(quimicaData);
  } else if (sampleType === 'biometria') {
    return renderBiometriaHematica(biometriaData);
  }

  return null;
};

const styles = StyleSheet.create({
  resultsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 15,
    textAlign: 'center',
  },
  formulaSection: {
    marginBottom: 20,
  },
  formulaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DEE2E6',
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resultItem: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6C757D',
    flex: 1,
  },
  resultValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#495057',
    textAlign: 'right',
  },
  observacionesContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFEAA7',
  },
  observacionesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 5,
  },
  observacionesText: {
    fontSize: 13,
    color: '#856404',
    fontStyle: 'italic',
  },
});

ResultadosView.propTypes = {
  sample: PropTypes.shape({
    status: PropTypes.bool,
    tipoMuestra: PropTypes.string,
    quimicaSanguinea: PropTypes.object,
    biometriaHematica: PropTypes.object,
  }),
};

export default ResultadosView;
