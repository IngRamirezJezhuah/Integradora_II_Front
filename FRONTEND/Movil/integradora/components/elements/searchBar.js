import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

const SearchBar = ({ searchText, onChangeSearch, onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        color="#ff4d4d"
        label="Buscar pedido"
        value={searchText}
        onChangeText={onChangeSearch}
        mode="outlined"
        right={<TextInput.Icon name="magnify" onPress={onSearch} />}
      />
      <Image
        source={require('../../assets/busqueda.png')}
        style={{ width: 24, height: 24 }}
      />
      {/* If you want a custom image button, uncomment below and provide a valid image source */}
      {/*
      <TouchableOpacity onPress={onSearch}>
      </TouchableOpacity>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default SearchBar;
