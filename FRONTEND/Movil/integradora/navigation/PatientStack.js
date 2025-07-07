// src/navigation/PatientStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditarPerfil, PacienteInicio } from '../screens';

const Stack = createNativeStackNavigator();

const PatientStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Paciente" component={PacienteInicio} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
    </Stack.Navigator>
);

export default PatientStack;
