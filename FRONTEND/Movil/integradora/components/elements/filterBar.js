import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const FilterBar = ({ activeFilter, setFilter, filters }) => {
  const handleFilterPress = (filter) => {
    // Si el filtro ya está activo, lo desactivamos (setFilter a null)
    // Si no está activo, lo activamos
    if (activeFilter === filter) {
      setFilter(null); // Desactivar filtro
    } else {
      setFilter(filter); // Activar filtro
    }
  };

  return (
    <View style={styles.container}>
      {filters.map((filter, index) => {
        const isActive = filter === activeFilter;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleFilterPress(filter)}
            style={[styles.button, isActive ? styles.active : styles.inactive]}
          >
            <Text style={isActive ? styles.textActive : styles.textInactive}>
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    marginBottom: 12,
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  active: {
    backgroundColor: '#DA0C15',
  },
  inactive: {
    backgroundColor: '#F0F0F0',
  },
  textActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textInactive: {
    color: '#888',
  },
});

FilterBar.propTypes = {
  activeFilter: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilterBar;
