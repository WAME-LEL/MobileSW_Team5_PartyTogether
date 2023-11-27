import {View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const GuildRanking = ( {goBack} ) =>{
    const [guildRankings, setGuildRankings] = useState([]);
    const [myGuild, setMyGuild] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchGuildRankings();
    }, []);

    const fetchGuildRankings = async () => {
        try {

            const res = await axios.get('http://localhost:8080/api/guilds');
            console.log(res.data); // API에서 반환된 데이터
            setGuildRankings(res.data.data) //멤버목록

            const foundGuild  = res.data.data.find(data => data.guildId === 102);
            setMyGuild(foundGuild);

        } catch (error) {
            console.error('There was an error!', error);
        }

        setIsLoading(false);
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>뒤로</Text>
                </TouchableOpacity>
                <Text style={styles.title}>길드 랭킹</Text>
            </View>

            {isLoading && (
              <ActivityIndicator style={styles.loadingContainer} size="large" color="#0000ff" />
            )}

            <ScrollView>
                {guildRankings.map((guild, index) => (
                    <View key={index} style={styles.rankingItem}>
                        <Text style={styles.rankingNumberText}>{guild.guildRanking}위</Text>
                        <Text style={styles.rankingText}>{guild.guildName}</Text>
                        <Text style={styles.pointText}>포인트: {guild.point}점</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.myGuildContainer}>
                {myGuild && (
                    <>
                        <Text style={styles.myGuildRankingText}>{myGuild.guildRanking}위  {myGuild.guildName}  {myGuild.point}점</Text>
                    </>
                )}
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 전체 화면을 사용하도록 설정
    },
    myGuildContainer: {
        height: 60,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        backgroundColor: '#f9f9f9', // 상자의 배경색
        marginHorizontal: 10, // 좌우 마진
        marginVertical: 10, // 상하 마진
        borderWidth: 1, // 테두리 두께
        borderColor: 'blue', // 테두리 색상
        borderRadius: 5, // 모서리 둥글게
    },
    header: {
        backgroundColor: '#333',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
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
    backButtonText: {
        color: '#fff', // 뒤로가기 텍스트 색상
        fontSize: 16,  // 뒤로가기 텍스트 크기
    },
    title: {
        color: '#fff',
        fontSize: 20,
    },
    rankingItem: {
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        // 추가적인 스타일링
    },
    rankingNumberText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    rankingText: {
        fontSize: 16,
        color: '#333',
        
    },
    pointText: {
        fontSize: 16,
        color: 'red'
    },
    myGuildRankingText: {
        fontSize: 20,
        fontWeight: 'bold',
        // 추가적인 스타일링
    },
    loadingContainer: {
        position: 'absolute', // 절대 위치
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
})

export default GuildRanking;