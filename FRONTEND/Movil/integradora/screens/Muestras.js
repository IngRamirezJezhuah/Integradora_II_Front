import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {SearchBar, FilterBar, TablaMuestras, Header, ModalMuestra } from '../components';
import { filterData } from '../utils/filterUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';


const MuestrasScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState(null); // Iniciar sin filtro activo
  const customFilters = ['En proceso', 'Completado'];
  
  // Estados para el modal
  const [selectedSample, setSelectedSample] = useState(null);
  const [showSampleModal, setShowSampleModal] = useState(false);

  
  const [muestras, setMuestras] = useState();

useEffect(() => {
  const fetchMuestras = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch(`${API_URL}/muestras`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMuestras(data.muestrasList || []);
        console.log('Respuesta de la API:', data);
      } else {
        console.error('Error fetching muestras:', response.status);
      }
    } catch (error) {
      console.error('Error fetching muestras:', error);
    }
  };

  fetchMuestras();
}, []);

const handleView = (item) => {
  console.log('View muestra', item);
  setSelectedSample(item);
  setShowSampleModal(true);
};

const handleDelete = (item) => {
  console.log('Delete muestra', item);
};

// Función para cerrar modal
const handleCloseModal = () => {
  setShowSampleModal(false);
  setSelectedSample(null);
};

// Función para filtrar por status y texto de búsqueda
const getFilteredData = () => {
  let filtered = muestras;
  
  // Filtrar por status solo si hay un filtro activo
  if (filter === 'En proceso') {
    filtered = filtered.filter(item => !item.status);
  } else if (filter === 'Completado') {
    filtered = filtered.filter(item => item.status);
  }
  // Si filter es null, no se aplica filtro por status (muestra todas)
  
  // Filtrar por texto de búsqueda
  if (searchText) {
    filtered = filterData(filtered, searchText);
  }
  
  return filtered;
};

const filteredData = getFilteredData();

return (
  <SafeAreaView>
      <Header title="Muestras" />
        <SearchBar placeholder={"Buscar Muestras"} searchText={searchText} onChangeSearch={setSearchText} />
        <FilterBar activeFilter={filter} setFilter={setFilter} filters={customFilters} />
        <TablaMuestras data={filteredData} onView={handleView} onDelete={handleDelete} />
        
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
