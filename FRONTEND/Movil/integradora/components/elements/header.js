import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MenuPerfil from './menuPerfil';

const Header = ({ title }) => {
    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <MenuPerfil />
        </View>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
});

export default Header;
