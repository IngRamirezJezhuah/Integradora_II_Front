import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#c3e1f7',
    },
})

export const Dashboard = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    caja_1:{
        //width:70,
        //height:70,
        marginTop:20,
        paddingVertical:25,
        paddingHorizontal:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(181, 236, 229)',
        borderRadius:25,
    },
    caja_2:{
        marginTop:20,
        paddingVertical:25,
        paddingHorizontal:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(182, 232, 204)',
        borderRadius:25,
    },
    caja_3:{
        marginTop:20,
        paddingVertical:25,
        paddingHorizontal:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(232, 227, 182)',
        borderRadius:25,
    },
    TextoAlerta:{
        marginTop:20,
        fontSize:20,
        fontWeight:'bold',
        textDecorationStyle:'double',
    }
})

export const muestras = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#c3e1f7',
    },
})