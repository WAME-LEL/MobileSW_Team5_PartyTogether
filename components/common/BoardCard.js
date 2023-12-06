import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import Icon_User from '../../assets/icons/Icon_User.png';

const {width, height} = Dimensions.get('window'); // 이거 왜 상위에서 넘겨주니까 인식을 못하냐

const BoardCard = ({ items, handlePress }) => {

    const imageSource = items.imageUrl ? { uri: items.imageUrl } : Icon_User;

    return (
        <TouchableOpacity style={styles.boardCard} onPress={handlePress}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{items.title}</Text>
                    <Text style={styles.time}>{items.processedTime}</Text>
                </View>
                <View style = {styles.middleLine}></View>
                <View style={styles.header}>
                    <Text style={styles.content} numberOfLines={1} ellipsizeMode='tail'>{items.content}</Text>
                    <Text style={styles.time} numberOfLines={1} ellipsizeMode='tail'>{items.nickname}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    boardCard: {
        flexDirection: 'row',
        width: width * 0.94,
        height: height * 0.1,
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.01,
        marginHorizontal: width * 0.03,
        marginBottom: height * 0.01,
        alignItems: 'center',
        justifyContent: 'center',
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
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '50%',
        alignItems: 'center',
    },
    title: {
        width : width * 0.5,
    },
    time: {
        width : width * 0.2,
    },
    content: {
        width : width * 0.5,
    },
    nickname: {
        fontWeight: 'bold',
        width : width * 0.2,
    },
    time: {
        color: '#666',
    }
});

export default BoardCard;