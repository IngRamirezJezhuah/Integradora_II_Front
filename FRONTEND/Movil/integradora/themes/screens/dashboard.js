import { StyleSheet } from "react-native";

export const DashboardStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    caja:{
        width:270,
        marginTop:20,
        paddingVertical:25,
        paddingHorizontal:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 6,
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