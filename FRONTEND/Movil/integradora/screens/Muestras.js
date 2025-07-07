import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import SearchBar from '../components/elements/searchBar';
import FilterBar from '../components/elements/filterBar';
import SamplesTable from '../components/samples/tablaMuestras';
import { filterData } from '../utils/filterUtils';
import axios from 'axios';
import { useEffect } from 'react';


const MuestrasScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('EnProceso');
  const customFilters = ['En proceso', 'Completado'];
  const filterKey = 'status';
  const [/* muestras */, setMuestras] = useState([]);
  
// const [muestras, setMuestras] = useState([]);

const muestras = [
    {"__v": 0, "_id": "6860648b90d32bcde0828eb3", "createDate": "2025-06-28T21:54:19.417Z", "deleteDate": "2025-06-28T21:55:08.074Z", "fechaTomaMuestra": "2025-06-28T21:54:19.417Z", "idusuario": "6650e3ab1234567890abcdef", "nombrePaciente": "Juan Pablo Pérez", "observaciones": "Actualizado por el Dr. González", "pedidoId": "6650e5cd1234567890abcdef", "quimicaSanguinea": [Object], "status": false, "statusShowClient": false, "tipoMuestra": "quimicaSanguinea"}, {"__v": 0, "_id": "6860cd358930eb0dc235f2ee", "createDate": "2025-06-29T05:20:53.410Z", "fechaTomaMuestra": "2025-06-29T05:20:53.410Z", "idusuario": "6650e3ab1234567890abcdef", "nombrePaciente": "Juan Pérez", "observaciones": "Muestra tomada correctamente", "pedidoId": "6650e5cd1234567890abcdef", "status": true, "statusShowClient": false, "tipoMuestra": "quimicaSanguinea"}, {"__v": 0, "_id": "6861579c8930eb0dc235f2f2", "createDate": "2025-06-29T15:11:24.097Z", "fechaTomaMuestra": "2025-06-29T15:11:24.097Z", "idusuario": "685c3712978fa098a3769589", "nombrePaciente": "Diego Pérez", "observaciones": "Muestra tomada correctamente", "pedidoId": "6650e5cd1234567890abcdef", "status": true, "statusShowClient": false, "tipoMuestra": "quimicaSanguinea"}
]

useEffect(() => {
  axios.get('.../muestras')
      .then(response => {
          setMuestras(response.data);
          console.log('Respuesta de la API:', response.data);
      })
      .catch(error => console.error('Error fetching muestras:', error));
}, []);

const handleView = (item) => {
  console.log('View muestra', item);
};

const handleDelete = (item) => {
  console.log('Delete muestra', item);
};
const filteredData = filterData(muestras, searchText);

return (
    <SafeAreaView>
        <SearchBar placeholder={"Buscar Muestras"} searchText={searchText} onChangeSearch={setSearchText} />
        <FilterBar activeFilter={filter} setFilter={setFilter} filters={customFilters} 
            filterKey={filterKey}/>
        <SamplesTable data={filteredData} onView={handleView} onDelete={handleDelete} />
    </SafeAreaView>
);
};

export default MuestrasScreen;
