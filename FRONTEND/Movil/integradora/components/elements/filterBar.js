import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const FilterBar = ({ activeFilter, setFilter }) => {
  return (
    <View style={styles.container}>
      <Button
        mode={activeFilter === 'EnProceso' ? 'contained' : 'outlined'}
        onPress={() => setFilter('EnProceso')}
        style={styles.button}
      >
        En proceso
      </Button>
      <Button
        mode={activeFilter === 'Completadas' ? 'contained' : 'outlined'}
        onPress={() => setFilter('Completadas')}
        style={styles.button}
      >
        Completadas
      </Button>
      <Button
        mode={activeFilter === 'Canceladas' ? 'contained' : 'outlined'}
        onPress={() => setFilter('Canceladas')}
        style={styles.button}
      >
        Canceladas
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    marginHorizontal: 5,
  },
});

export default FilterBar;
