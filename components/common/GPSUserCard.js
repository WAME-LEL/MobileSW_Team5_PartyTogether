import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import Icon_User from '../../assets/icons/Icon_User.png';

const GPSUserCard = ({ items, handlePress }) => {

    const imageSource = items.imageUrl ? { uri: items.imageUrl } : Icon_User;

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
                        닉네임 : {items.nickname}
                    </Text>
                    <Text style={styles.time}>유사도 : {items.similarity}%</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.content}>나이 : {items.age}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: 350,
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
    title: {
        fontWeight: 'bold',
        width: '60%',
    },
    nickname: {
        fontWeight: 'bold',
    },
    time: {
        color: '#666',
        width: '35%'
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

export default GPSUserCard;