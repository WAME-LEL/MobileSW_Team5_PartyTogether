import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleBox : {
        width: 350,
        height: 50, 
        borderColor: 'gray',
        borderWidth: 1,
    },
    middleButton : {
        width: 200,
        height: 50,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: '#00ccff',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleFont : {
        fontSize: 20,
        fontWeight: 'bold',
    },
    smallFont : {
        fontSize: 15,
        fontWeight: 'bold'
    },
    smallButton : {
        width : 100,
        height : 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#00ccff',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;