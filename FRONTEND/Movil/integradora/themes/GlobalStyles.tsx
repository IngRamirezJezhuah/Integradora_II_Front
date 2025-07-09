import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#c3e1f7',
    },
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
})

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

export const muestras = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#c3e1f7',
    },
})
