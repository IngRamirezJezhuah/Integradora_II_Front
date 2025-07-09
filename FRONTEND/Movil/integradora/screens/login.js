import React from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useFocusField, useLoginForm, useAuth } from '../hooks';

const Login = ({ onLoginSuccess }) => {
  const navigation = useNavigation();
  
  // Hooks para funcionalidad específica
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();
  const { correo, contraseña, setCorreo, setContraseña, isFormValid } = useLoginForm();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!isFormValid()) {
      Alert.alert('Campos vacíos', 'Por favor, llena todos los campos');
      return;
    }

    await login(correo, contraseña, onLoginSuccess);
  };

  return (
    <View style={styles.container}>
      <Image
        // eslint-disable-next-line
        source={require('../assets/logo-iic.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      <Text style={styles.title}>Bienvenido</Text>
      
      <TextInput
        style={getFieldStyle('correo', styles.input, styles.inputFocus)}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
        keyboardType="email-address"
        onFocus={() => setFocus('correo')}
        onBlur={clearFocus}
      />
      
      <TextInput
        style={getFieldStyle('contraseña', styles.input, styles.inputFocus)}
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
        onFocus={() => setFocus('contraseña')}
        onBlur={clearFocus}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Recovery')}>
        <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      
      <Image
        // eslint-disable-next-line
        source={require('../assets/logo-ujed.png')}
        style={styles.logoBottom}
        resizeMode="contain"
      />
    </View>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func,
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Montserrat',
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  inputFocus: {
    borderColor: '#BF1E2D',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#DA0C15',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#3b82f6',
    marginTop: 20,
  },
  logoBottom: {
    width: 120,
    height: 120,
    marginTop: 30,
  },
});
