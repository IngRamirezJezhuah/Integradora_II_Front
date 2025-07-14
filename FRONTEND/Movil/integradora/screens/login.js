import React from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useFocusField, useLoginForm, useAuth } from '../hooks';
import { authStyles } from '../themes';

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
    <View style={authStyles.container}>
      <Image
        // eslint-disable-next-line
        source={require('../assets/logo-iic.png')}
        style={authStyles.logo}
        resizeMode="contain"
      />
      
      <Text style={authStyles.title}>Bienvenido</Text>
      
      <TextInput
        style={getFieldStyle('correo', authStyles.input, authStyles.inputFocus)}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
        keyboardType="email-address"
        onFocus={() => setFocus('correo')}
        onBlur={clearFocus}
      />
      
      <TextInput
        style={getFieldStyle('contraseña', authStyles.input, authStyles.inputFocus)}
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
        onFocus={() => setFocus('contraseña')}
        onBlur={clearFocus}
      />
      
      <TouchableOpacity style={authStyles.button} onPress={handleLogin}>
        <Text style={authStyles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Recovery')}>
        <Text style={authStyles.linkText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      
      <Image
        // eslint-disable-next-line
        source={require('../assets/logo-ujed.png')}
        style={authStyles.logoBottom}
        resizeMode="contain"
      />
    </View>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func,
};

export default Login;
