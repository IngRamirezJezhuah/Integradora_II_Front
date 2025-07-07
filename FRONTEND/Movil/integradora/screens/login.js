import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Campos vacíos', 'Por favor, llena todos los campos');
      return;
    }

    try {
      const response = await fetch('http://vps-5127231-x.dattaweb.com:3500/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.data) {
        // Guardar el token en AsyncStorage
        await AsyncStorage.setItem('userToken', data.token || 'authenticated');
        await AsyncStorage.setItem('userData', JSON.stringify(data.data));
        
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        
        // Llamar a la función onLoginSuccess si está disponible
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        Alert.alert('Error', data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', 'Algo salió mal');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
        <Image
            // eslint-disable-next-line
            source={require('../assets/logo-iic.png')}
            style={{ width: 120, height: 120, marginBottom: 30 }}
            resizeMode="contain"
        />
      <Text style={styles.title}>Bienvenido</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Recuperar contraseña', 'Funcionalidad no implementada')}>
            <Text style={{ color: '#3b82f6', marginTop: 20 }}>¿Olvidaste tu contraseña?</Text>
            
        </TouchableOpacity>
        <Image

            // eslint-disable-next-line
            source={require('../assets/logo-ujed.png')}
            style={{ width: 120, height: 120, marginTop: 30}}
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
  title: {
    fontSize: 28,
    faontWeight: 'bold',
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
});
