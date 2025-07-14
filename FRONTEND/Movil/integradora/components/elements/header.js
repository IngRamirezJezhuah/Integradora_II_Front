import React from 'react';
import { View, Text, } from 'react-native';
import PropTypes from 'prop-types';
import MenuPerfil from './menuPerfil';
import { styles } from '../../themes';

const Header = ({ title, showMenu = true }) => {
    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            {showMenu && <MenuPerfil />}
        </View>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    showMenu: PropTypes.bool,
};


export default Header;
