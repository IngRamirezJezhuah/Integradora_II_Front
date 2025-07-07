// src/navigation/AuthStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropTypes from 'prop-types';
import {Login, Recovery} from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = ({ onLoginSuccess }) => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login">
            {(props) => <Login {...props} onLoginSuccess={onLoginSuccess} />}
        </Stack.Screen>
        <Stack.Screen name="Recovery" component={Recovery} />
    </Stack.Navigator>
);

AuthStack.propTypes = {
    onLoginSuccess: PropTypes.func,
};

export default AuthStack;
