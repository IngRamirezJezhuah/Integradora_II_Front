import React from 'react';
import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { SearchBar, FilterBar, TablaMuestras, Header, ModalMuestra } from '../components';
import { useMuestras, useMuestrasFilter, useMuestrasActions } from '../hooks';


const MuestrasScreen = () => {
  // Hook para datos de muestras
  const {
    muestras,
    loading,
    refreshing,
    error,
    deleteMuestra,
    updateMuestraStatus,
    onRefresh,
  } = useMuestras();

  // Hook para filtros
  const {
    searchText,
    setSearchText,
    filter,
    setFilter,
    customFilters,
    filteredData,
    getFilterStatusText,
  } = useMuestrasFilter(muestras);

  // Hook para acciones
  const {
    selectedSample,
    showSampleModal,
    handleView,
    handleCloseModal,
    handleDelete,
  } = useMuestrasActions(deleteMuestra, updateMuestraStatus);

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="Muestras" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
          <Text style={{ color: '#d32f2f', fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
            {error}
          </Text>
          <Text style={{ color: '#666', fontSize: 14, textAlign: 'center' }}>
            Toca para intentar nuevamente
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Muestras" />
      <SearchBar 
        placeholder="Buscar Muestras" 
        searchText={searchText} 
        onChangeSearch={setSearchText} 
      />
      <FilterBar 
        activeFilter={filter} 
        setFilter={setFilter} 
        filters={customFilters} 
      />
      
      {/* Indicador de estado de filtros */}
      <View style={{ paddingHorizontal: 10, paddingBottom: 8 }}>
        <Text style={{ color: '#666', fontSize: 14, fontStyle: 'italic' }}>
          {getFilterStatusText()}
        </Text>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
          <ActivityIndicator size="large" color="#DA0C15" />
          <Text style={{ marginTop: 10, color: '#666' }}>Cargando muestras...</Text>
        </View>
      ) : (
        <>
          {filteredData.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
              <Text style={{ color: '#666', fontSize: 16, textAlign: 'center' }}>
                {muestras.length === 0 ? 'No hay muestras disponibles' : 'No se encontraron muestras con los filtros aplicados'}
              </Text>
            </View>
          ) : (
            <TablaMuestras 
              data={filteredData} 
              onView={handleView} 
              onDelete={handleDelete}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
        </>
      )}
      
      {/* Modal para detalles generales de muestra */}
      <ModalMuestra
        isVisible={showSampleModal}
        sample={selectedSample}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
};

export default MuestrasScreen;
