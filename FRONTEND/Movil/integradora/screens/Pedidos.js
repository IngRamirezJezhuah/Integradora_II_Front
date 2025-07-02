import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import SearchBar from '../components/elements/searchBar';
import FilterBar from '../components/elements/filterBar';
import OrdersTable from '../components/orders/ordersTable';
// import { filterData } from '../utils/filterUtils';


const OrdersScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('EnProceso');
  const customFilters = ['En proceso', 'Completado', 'Cancelado'];
  const filterKey = 'status';
  
  const orders = [
    {
      "id": "P1285",
    "nameUsuario": "Juan Perez",
    "status": "En proceso",
    "descripcion": "Análisis de rutina anual",
    "procedimientos": [
      {
        "titulo": "quimica sanguinea",
        "costo": 120,
        "diasEspera": 1,
        "estatus": 1
      },
      {
        "titulo": "biometria hematica",
        "costo": 150,
        "diasEspera": 2,
        "estatus": 1
      }
    ],
    "createDate": "2025-06-20"
  },
  {
    "id": "P1286",
    "nameUsuario": "Maria Gomez",
    "status": "Completado",
    "descripcion": "Chequeo postoperatorio",
    "procedimientos": [
      {
        "titulo": "quimica sanguinea",
        "costo": 120,
        "diasEspera": 1,
        "estatus": 1
      }
    ],
    "createDate": "2025-06-18"
  },
  {
    "id": "P1287",
    "nameUsuario": "Carlos Lopez",
    "status": "Cancelado",
    "descripcion": "Análisis de control diabetes",
    "procedimientos": [
      {
        "titulo": "biometria hematica",
        "costo": 150,
        "diasEspera": 2,
        "estatus": 1
      }
    ],
    "createDate": "2025-06-15"
  },
  {
    "id": "P1288",
    "nameUsuario": "Ana Martinez",
    "status": "En proceso",
    "descripcion": "Examen general",
    "procedimientos": [
      {
        "titulo": "quimica sanguinea",
        "costo": 120,
        "diasEspera": 1,
        "estatus": 1
      },
      {
        "titulo": "biometria hematica",
        "costo": 150,
        "diasEspera": 2,
        "estatus": 1
      }
    ],
    "createDate": "2025-06-22"
  }
];

const handleView = (item) => {
  console.log('View order', item);
};

const handleDelete = (item) => {
  console.log('Delete order', item);
};
/* const filteredData = filterData(orders, searchText); */

  return (
    <SafeAreaView>
      <SearchBar placeholder={"Buscar Pedidos"} searchText={searchText} onChangeSearch={setSearchText} />
      <FilterBar activeFilter={filter} setFilter={setFilter} filters={customFilters} 
        filterKey={filterKey}/>
      <OrdersTable data={orders} onView={handleView} onDelete={handleDelete} />
    </SafeAreaView>
  );
};

export default OrdersScreen;
