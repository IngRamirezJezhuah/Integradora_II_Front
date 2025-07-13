import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ResultadosView = ({ sample }) => {
  if (!sample || sample.status === false) {
    return null;
  }

  const renderQuimicaSanguinea = (resultados) => {
    if (!resultados) return null;

    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Resultados - Química Sanguínea</Text>
        <View style={styles.resultsGrid}>
          {resultados.glucosa && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Glucosa:</Text>
              <Text style={styles.resultValue}>{resultados.glucosa} mg/dL</Text>
            </View>
          )}
          {resultados.glucosaPost && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Glucosa Post:</Text>
              <Text style={styles.resultValue}>{resultados.glucosaPost} mg/dL</Text>
            </View>
          )}
          {resultados.acidoUrico && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Ácido Úrico:</Text>
              <Text style={styles.resultValue}>{resultados.acidoUrico} mg/dL</Text>
            </View>
          )}
          {resultados.urea && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Urea:</Text>
              <Text style={styles.resultValue}>{resultados.urea} mg/dL</Text>
            </View>
          )}
          {resultados.creatinina && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Creatinina:</Text>
              <Text style={styles.resultValue}>{resultados.creatinina} mg/dL</Text>
            </View>
          )}
          {resultados.colesterol && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Colesterol:</Text>
              <Text style={styles.resultValue}>{resultados.colesterol} mg/dL</Text>
            </View>
          )}
          {resultados.LDR && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>LDR:</Text>
              <Text style={styles.resultValue}>{resultados.LDR} mg/dL</Text>
            </View>
          )}
          {resultados.gGT && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>GGT:</Text>
              <Text style={styles.resultValue}>{resultados.gGT} U/L</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderBiometriaHematica = (resultados) => {
    if (!resultados) return null;

    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>🩸 Resultados - Biometría Hemática</Text>
        
        {resultados.formulaRoja && (
          <View style={styles.formulaSection}>
            <Text style={styles.formulaTitle}>Fórmula Roja</Text>
            <View style={styles.resultsGrid}>
              {resultados.formulaRoja.hemoglobina && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Hemoglobina:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaRoja.hemoglobina} g/dL</Text>
                </View>
              )}
              {resultados.formulaRoja.hematocrito && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Hematocrito:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaRoja.hematocrito}%</Text>
                </View>
              )}
              {resultados.formulaRoja.eritrocitos && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Eritrocitos:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaRoja.eritrocitos} M/μL</Text>
                </View>
              )}
              {resultados.formulaRoja.conMediaHb && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Conc. Media Hb:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaRoja.conMediaHb} g/dL</Text>
                </View>
              )}
              {resultados.formulaRoja.volGlobularMedia && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Vol. Globular Media:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaRoja.volGlobularMedia} fL</Text>
                </View>
              )}
              {resultados.formulaRoja.HBCorpuscularMedia && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Hb Corpuscular Media:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaRoja.HBCorpuscularMedia} pg</Text>
                </View>
              )}
              {resultados.formulaRoja.plaqutas && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Plaquetas:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaRoja.plaqutas} K/μL</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {resultados.formulaBlanca && (
          <View style={styles.formulaSection}>
            <Text style={styles.formulaTitle}>Fórmula Blanca</Text>
            <View style={styles.resultsGrid}>
              {resultados.formulaBlanca.cuentaLeucocitaria && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Cuenta Leucocitaria:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaBlanca.cuentaLeucocitaria} /μL</Text>
                </View>
              )}
              {resultados.formulaBlanca.linfocitos && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Linfocitos:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaBlanca.linfocitos}%</Text>
                </View>
              )}
              {resultados.formulaBlanca.monocitos && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Monocitos:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaBlanca.monocitos}%</Text>
                </View>
              )}
              {resultados.formulaBlanca.segmentados && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Segmentados:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaBlanca.segmentados}%</Text>
                </View>
              )}
              {resultados.formulaBlanca.enBanda && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>En Banda:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaBlanca.enBanda}%</Text>
                </View>
              )}
              {resultados.formulaBlanca.neutrofilosT && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Neutrófilos T:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaBlanca.neutrofilosT}%</Text>
                </View>
              )}
              {resultados.formulaBlanca.eosinofilos && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Eosinófilos:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaBlanca.eosinofilos}%</Text>
                </View>
              )}
              {resultados.formulaBlanca.basofilos !== undefined && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Basófilos:</Text>
                  <Text style={styles.resultValue}>{resultados.formulaBlanca.basofilos}%</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  // Determinar qué tipo de resultados mostrar
  const tipoMuestra = sample.tipoMuestra?.toLowerCase().replace(/\s+/g, '');
  
  if (tipoMuestra?.includes('quimicasanguinea') || tipoMuestra?.includes('quimica')) {
    return renderQuimicaSanguinea(sample.quimicaSanguinea);
  } else if (tipoMuestra?.includes('biometriahematica') || tipoMuestra?.includes('biometria')) {
    return renderBiometriaHematica(sample.biometriaHematica);
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
