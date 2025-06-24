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
    caja:{
        width:'70%',
        marginTop:20,
        paddingVertical:25,
        paddingHorizontal:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
    },
    ctemperatura:{
        backgroundColor:'#FD908B',
    },
    chumedad:{
        backgroundColor:'#FFC7BC',
    },
    cmuestra:{
        backgroundColor:'#DA9409',
    },
    cprecaucion:{
        backgroundColor:'#76F058',
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
