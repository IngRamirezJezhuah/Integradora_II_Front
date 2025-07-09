import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import useFocusField from '../../hooks/useFocusField';

const SearchBar = ({ searchText, onChangeSearch, placeholder }) => {
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();

  return (
    <View style={styles.container}>
      <TextInput
        style={getFieldStyle('search', styles.input, styles.inputFocus)}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={onChangeSearch}
        onFocus={() => setFocus('search')}
        onBlur={clearFocus}
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
  inputFocus: {
    borderColor: '#BF1E2D',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 12,
  },
});

// PropTypes para validación de props
SearchBar.propTypes = {
  searchText: PropTypes.string,
  onChangeSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
