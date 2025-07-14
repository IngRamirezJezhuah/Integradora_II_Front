import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusField, usePasswordRecovery } from '../hooks';
import { authStyles } from '../themes';

const Recuperacion = () => {
  const navigation = useNavigation();
  
  // Hooks para funcionalidad específica
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();
  const { email, setEmail, sendRecoveryRequest } = usePasswordRecovery();

  return (
    <View style={authStyles.container}>
      <Image
        // eslint-disable-next-line
        source={require('../assets/logo-iic.png')}
        style={authStyles.logo}
        resizeMode="contain"
      />
      
      <Text style={authStyles.title}>Recuperar Contraseña</Text>

      <TextInput
        style={getFieldStyle('email', authStyles.input, authStyles.inputFocus)}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        onFocus={() => setFocus('email')}
        onBlur={clearFocus}
      />

      <TouchableOpacity style={authStyles.button} onPress={sendRecoveryRequest}>
        <Text style={authStyles.buttonText}>Recuperar Contraseña</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={authStyles.linkText}>Volver al Inicio de Sesión</Text>
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

export default Recuperacion;
