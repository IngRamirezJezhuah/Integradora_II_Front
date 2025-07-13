import { useState } from 'react';
import { Alert } from 'react-native';
import { API_URL } from '@env';


const usePasswordRecovery = () => {
  const [email, setEmail] = useState('');

// Validar que el email no esté vacío

  const isEmailValid = () => {
    return email.trim() !== '';
  };


// Enviar solicitud de recuperación de contraseña

  const sendRecoveryRequest = async () => {
    if (!isEmailValid()) {
      Alert.alert('Campo vacío', 'Por favor, ingresa tu correo electrónico');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/usuarios/forget`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ correo: email }),
      });

      const responseText = await response.text();
      
      if (response.ok) {
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = { message: responseText };
        }

        Alert.alert(
          'Éxito', 
          responseData.message || 'Se ha enviado un código de recuperación a tu correo electrónico'
        );
        
        // Limpiar el campo después del éxito
        setEmail('');
      } else {
        Alert.alert('Error', 'No se pudo enviar el código de recuperación. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Recovery error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('Network request failed')) {
        Alert.alert('Error de conexión', 'No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      } else {
        Alert.alert('Error', 'Algo salió mal. Por favor, intenta de nuevo.');
      }
    }
  };

  return {
    email,
    setEmail,
    isEmailValid,
    sendRecoveryRequest
  };
};

export default usePasswordRecovery;
