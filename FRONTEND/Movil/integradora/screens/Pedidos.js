import React from 'react';
import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { SearchBar, FilterBar, TablaPedidos, Header } from '../components';
import { usePedidos, usePedidosFilter, usePedidosActions } from '../hooks';

const OrdersScreen = () => {
  // Hook para datos de pedidos
  const {
    pedidos,
    loading,
    refreshing,
    error,
    deletePedido,
    updatePedidoEstado,
    onRefresh,
  } = usePedidos();

  // Hook para filtros
  const {
    searchText,
    setSearchText,
    filter,
    setFilter,
    customFilters,
    filteredData,
    getFilterStatusText,
  } = usePedidosFilter(pedidos);

  // Hook para acciones
  const {
    selectedOrder,
    handleView,
    handleCloseModal,
    handleDelete,
    handleCompletarPedido,
    handleCancelarPedido,
    handleNuevaMuestra,
  } = usePedidosActions(deletePedido, updatePedidoEstado);

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="Pedidos" />
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
      <Header title="Pedidos" />
      <SearchBar 
        placeholder="Buscar Pedidos" 
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
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={{ marginTop: 10, color: '#666' }}>Cargando pedidos...</Text>
        </View>
      ) : (
        <>
          {filteredData.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
              <Text style={{ color: '#666', fontSize: 16, textAlign: 'center' }}>
                {pedidos.length === 0 ? 'No hay pedidos disponibles' : 'No se encontraron pedidos con los filtros aplicados'}
              </Text>
            </View>
          ) : (
            <TablaPedidos 
              data={filteredData} 
              onView={handleView} 
              onDelete={handleDelete}
              refreshing={refreshing}
              onRefresh={onRefresh}
              selectedOrder={selectedOrder}
              onCloseModal={handleCloseModal}
              onCompletarPedido={handleCompletarPedido}
              onCancelarPedido={handleCancelarPedido}
              onNuevaMuestra={handleNuevaMuestra}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;
