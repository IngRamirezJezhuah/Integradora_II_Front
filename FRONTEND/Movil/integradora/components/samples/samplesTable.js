import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity , Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SamplesTable = ({ data, onView, onDelete }) => {
// const getIconSource = (tipo) => {
//     // Normaliza el nombre del tipo para que coincida con el nombre del archivo
//     // Ejemplo: "biometria hematica" -> "biometriahematica.png"
//     if (!tipo) return require('../../../assets/icon.png');
//     const iconName = tipo.replace(/\s+/g, '').toLowerCase() + '.png';
//     try {
//         return require(`../../../assets/${iconName}`);
//     } catch (e) {
//         return require('../../../assets/icon.png');
//     }
// };

return (
    <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={styles.row}>
                <Image
                    source={("/assets/biometriahematica.png")} // Use a default icon or modify to use getIconSource(item.tipoMuestra)
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                />
                <Text style={styles.orderText}>{item.id}</Text>
                <TouchableOpacity onPress={() => onView(item)}>
                    <MaterialCommunityIcons name="file-search-outline" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(item)}>
                    <MaterialCommunityIcons name="trash-can" size={30} color="black" />
                </TouchableOpacity>
            </View>
        )}
    />
);
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  orderText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SamplesTable;
