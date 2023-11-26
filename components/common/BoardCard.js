import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';

const BoardCard = ({ items, handlePress }) => {

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <Image source={{ uri: items.imageUrl }} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>{items.title}</Text>
                    <Text style={styles.time}>{items.time}</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.content}>{items.content}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3, // for Android shadow
        shadowOffset: { width: 1, height: 1 }, // for iOS shadow
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
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
        marginBottom: 5,
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