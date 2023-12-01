import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigImageButton : {
        width: 170,
        height: 170,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        elevation: 5,
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
        backgroundColor: '#CC0000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleFont : {
        fontSize: 20,
        fontWeight: 'bold',
    },
    middleFontWhite : {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }, 
    smallFont : {
        fontSize: 15,
        fontWeight: 'bold'
    },
    smallFontWhite : {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    smallButton : {
        width : 100,
        height : 50,
        borderColor: 'gray',
        borderRadius: 10,
        backgroundColor: '#00ccff',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;