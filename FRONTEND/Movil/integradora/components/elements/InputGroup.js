import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const InputGroup = ({ 
  labelTitle, 
  value, 
  onChangeText, 
  placeholder, 
  multiline = false, 
  numberOfLines = 1,
  keyboardType = "numeric",
  secureTextEntry = false,
  onFocus,
  onBlur,
  style = {},
  editable = true
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{labelTitle}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={multiline ? "default" : keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputFocus: {
    borderColor: '#BF1E2D',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    color: '#666',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
});

// PropTypes para validación de props
InputGroup.propTypes = {
  labelTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object,
  editable: PropTypes.bool,
};

export default InputGroup;
