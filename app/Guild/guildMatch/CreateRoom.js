import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const CreateRoom = ( {goBack} ) => {
    const [guildMembers1, setGuildMembers1] = useState(['Member 1A', 'Member 2A', 'Member 3A', 'Member 4A', 'Member 5A']);
    const [guildMembers2, setGuildMembers2] = useState(['Member 1B', 'Member 2B', 'Member 3B', 'Member 4B', 'Member 5B']);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Text style={styles.buttonText}>뒤로</Text>
                </TouchableOpacity>
                <Text style={styles.title}>길드전</Text>
            </View>
            
            <Text style={styles.guildTitle}>길드 1</Text>
            {guildMembers1.map((member, index) => (
                <Text key={index} style={styles.member}>{member}</Text>
            ))}
            <Text style={styles.guildTitle}>길드 2</Text>
            {guildMembers2.map((member, index) => (
                <Text key={index} style={styles.member}>{member}</Text>
            ))}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3D3D3', 
    },
    header: {
        backgroundColor: '#333',
        padding: 10,
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: 'skyblue',
        position: 'absolute',
        paddingVertical: 5,
        paddingHorizontal: 20, 
        left: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold', // 굵은 폰트
    },
    title: {
        color: '#fff',
        fontSize: 20,
    },
    guildTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    member: {
        fontSize: 16,
        marginVertical: 2,
    },
});

export default CreateRoom