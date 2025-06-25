import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterBar = ({ activeFilter, setFilter, filters }) => {

  return (
    <View style={styles.container}>
      {filters.map((filter, index) => {
        const isActive = filter === activeFilter;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => setFilter(filter)}
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
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginBottom: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  active: {
    backgroundColor: '#D32F2F',
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

export default FilterBar;
