import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";

const Pedidos= () =>{
    return (
        <View style={styles.container}>
        <Text>Pedidos</Text>
        <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Pedidos; 