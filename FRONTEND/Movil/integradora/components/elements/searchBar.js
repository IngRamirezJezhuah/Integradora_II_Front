import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ searchText, onChangeSearch, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={onChangeSearch}
      />
      <Feather name="search" size={20} color="#D32F2F" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 40,
    height: 45,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 12,
  },
});

export default SearchBar;
