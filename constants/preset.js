import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameNameBox : {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10, 
        backgroundColor: '#CCCCCC',
        borderRadius: 50
    },
    longImageButton : {
        width: 400,
        height: 100,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        elevation: 5,
    },
    hugeImageButton : {
        width: 250,
        height: 250,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        elevation: 5,
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
    smallImageButton : {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageButtonIn : {
        width: '80%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CCCCCC',
    },
    middleBox : {
        width: 350,
        height: 50, 
        borderColor: 'gray',
        backgroundColor: '#FFFFFF',
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
    smallButton : {
        width : 100,
        height : 35,
        borderRadius: 17.5,
        backgroundColor: '#ff6600',
        justifyContent: 'center',
        alignItems: 'center'
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
});

export default styles;