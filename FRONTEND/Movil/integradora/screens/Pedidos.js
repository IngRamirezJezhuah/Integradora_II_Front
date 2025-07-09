import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, Alert } from 'react-native';
import { SearchBar, FilterBar, TablaPedidos, Header } from '../components';
import { filterData } from '../utils/filterUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';



const OrdersScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState(null); // Iniciar sin filtro activo
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const customFilters = ['En proceso', 'Completado', 'Cancelado'];

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      
      console.log('Token obtenido:', token ? 'Token presente' : 'No hay token');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        if (!isRefreshing) setLoading(false);
        return;
      }
      const response = await fetch(`${API_URL}/pedidos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Respuesta recibida:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Respuesta completa:', responseData);
        
        // Verificar si la respuesta tiene la estructura esperada
        if (responseData.success && responseData.data && Array.isArray(responseData.data)) {
          console.log('Datos recibidos:', responseData.data);
          console.log('Número de pedidos:', responseData.data.length);
          console.log('Count del servidor:', responseData.count);
          
          // Verificar la estructura de cada pedido
          responseData.data.forEach((pedido, index) => {
            console.log(`Pedido ${index + 1}:`, {
              id: pedido._id,
              estado: pedido.estado,
              usuarioId: pedido.usuarioId,
              analisis: pedido.analisis,
              total: pedido.total,
              fechaCreacion: pedido.fechaCreacion
            });
          });
          
          setPedidos(responseData.data);
        } else {
          console.error('Estructura de respuesta inesperada:', responseData);
          Alert.alert('Error', 'La respuesta del servidor no tiene el formato esperado');
        }
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        Alert.alert('Error', `Error al obtener pedidos: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      if (error.name === 'TypeError' && error.message.includes('Network request failed')) {
        Alert.alert('Error de red', 'No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      } else if (error.name === 'SyntaxError') {
        Alert.alert('Error de formato', 'La respuesta del servidor no es válida.');
      } else {
        Alert.alert('Error', `Error de conexión: ${error.message}`);
      }
    } finally {
      if (!isRefreshing) setLoading(false);
      if (isRefreshing) setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPedidos(true);
  };

const handleView = (item) => {
  console.log('View order', item);
};

const handleDelete = (item) => {
  console.log('Delete order', item);
};

// Función para filtrar por estado y texto de búsqueda
const getFilteredData = () => {
  let filtered = pedidos;
  
  console.log('Pedidos totales:', pedidos.length);
  console.log('Filtro activo:', filter);
  console.log('Texto de búsqueda:', searchText);
  
  // Filtrar por estado solo si hay un filtro activo
  if (filter === 'En proceso') {
    filtered = filtered.filter(item => item.estado === 'pendiente');
  } else if (filter === 'Completado') {
    filtered = filtered.filter(item => item.estado === 'completado');
  } else if (filter === 'Cancelado') {
    filtered = filtered.filter(item => item.estado === 'cancelado');
  }
  // Si filter es null, no se aplica filtro por estado (muestra todos)
  
  console.log('Pedidos después del filtro por estado:', filtered.length);
  
  // Filtrar por texto de búsqueda
  if (searchText) {
    filtered = filterData(filtered, searchText);
  }
  
  console.log('Pedidos después del filtro por texto:', filtered.length);
  
  return filtered;
};

const filteredData = getFilteredData();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Pedidos" />
      <SearchBar placeholder={"Buscar Pedidos"} searchText={searchText} onChangeSearch={setSearchText} />
      <FilterBar activeFilter={filter} setFilter={setFilter} filters={customFilters} />
      {!filter && (
        <View style={{ paddingHorizontal: 10, paddingBottom: 8 }}>
          <Text style={{ color: '#666', fontSize: 14, fontStyle: 'italic' }}>
            Mostrando todos los pedidos ({pedidos.length} total)
          </Text>
        </View>
      )}
      {filter && (
        <View style={{ paddingHorizontal: 10, paddingBottom: 8 }}>
          <Text style={{ color: '#666', fontSize: 14, fontStyle: 'italic' }}>
            Mostrando pedidos &quot;{filter}&quot; ({filteredData.length} de {pedidos.length})
          </Text>
        </View>
      )}
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
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;
