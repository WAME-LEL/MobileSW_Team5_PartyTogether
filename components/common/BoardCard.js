import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import Icon_User from '../../assets/icons/Icon_User.png';

const BoardCard = ({ items, handlePress }) => {

    const imageSource = items.imageUrl ? { uri: items.imageUrl } : Icon_User;

    return (
        <TouchableOpacity style={styles.boardCard} onPress={handlePress}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>{items.title}</Text>
                    <Text style={styles.time}>{items.processedTime}</Text>
                </View>
                <View style = {styles.middleLine}></View>
                <View style={styles.header}>
                    <Text style={styles.content}>{items.content}</Text>
                    <Text style={styles.time}>{items.nickname}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    boardCard: {
        flexDirection: 'row',
        width: '94%',
        height: 70,
        padding: '2%',
        marginHorizontal: '3%',
        marginBottom: '3%',
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3, // for Android shadow
        shadowOffset: { width: 1, height: 1 }, // for iOS shadow
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    middleLine : {
        borderBottomColor: '#CCCCCC', 
        borderBottomWidth: 1, 
        marginHorizontal: 1, 
        marginBottom: '2%'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '45%',
    },
    nickname: {
        fontWeight: 'bold',
    },
    time: {
        color: '#666',
    },
    body: {
        // You can style this as needed
    },
    content: {
        // You can style this as needed
    },
    openChat: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default BoardCard;