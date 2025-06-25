import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import SearchBar from '../components/elements/searchBar';
import FilterBar from '../components/elements/filterBar';
import OrdersTable from '../components/orders/orderTable'; // Assuming you have an OrdersTable component


const OrdersScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('EnProceso');

  const orders = [
    { name: 'P1285' },
    { name: 'P1287' },
    { name: 'P1286' },
    { name: 'P1288' },
    { name: 'P1289' },
    { name: 'P1290' },
  ];

  const handleView = (item) => {
    console.log('View order', item);
  };

  const handleDelete = (item) => {
    console.log('Delete order', item);
  };

  return (
    <SafeAreaView>
      <SearchBar searchText={searchText} onChangeSearch={setSearchText} />
      <FilterBar activeFilter={filter} setFilter={setFilter} />
      <OrdersTable orders={orders} onView={handleView} onDelete={handleDelete} />
    </SafeAreaView>
  );
};

export default OrdersScreen;
