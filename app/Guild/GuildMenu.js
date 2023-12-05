import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image  } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const GuildMenu = () => {
    const router = useRouter();

    return (
        <SafeAreaView>
            <View style={styles.container}>
                
                <TouchableOpacity style={styles.categoryContainer} onPress={() => {router.push('Guild/GuildInformation')}}>
                    <Image source={require('../../assets/icons/Icon_GuildInformation.png')} style={styles.icon} />
                    <Text style={styles.buttonText}>길드 정보</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.categoryContainer} onPress={() => {router.push('Guild/GuildSearch')}}>
                    <Image source={require('../../assets/icons/Icon_GuildSearch.png')} style={styles.icon} />
                    <Text style={styles.buttonText}>길드 찾기</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.categoryContainer} onPress={() => {router.push('Guild/CreateGuild')}}>
                    <Image source={require('../../assets/icons/Icon_CreateGuild.png')} style={styles.icon} />
                    <Text style={styles.buttonText}>길드 생성</Text>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryContainer: {
        height: 250,
        padding: 15,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 10,
        elevation: 2,
        shadowRadius: 2,
        justifyContent: 'center', // 텍스트를 중앙에 위치시킵니다.
        alignItems: 'center', // 텍스트를 중앙에 위치시킵니다.
        flexDirection: 'row', // 수평 정렬
        paddingLeft: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        width: 150, // 원하는 너비
        height: 150, // 원하는 높이
        marginRight: 40, // 텍스트와의 간격 조정
    },
});

export default GuildMenu;