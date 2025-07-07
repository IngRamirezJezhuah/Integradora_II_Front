// src/navigation/AuthStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {EditProfile, PatientsHome} from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
    <Stack.Navigator >
        <Stack.Screen name="Login" component={EditProfile} />
        <Stack.Screen name="Estudios" component={PatientsHome} />
    </Stack.Navigator>
);

export default AuthStack;
