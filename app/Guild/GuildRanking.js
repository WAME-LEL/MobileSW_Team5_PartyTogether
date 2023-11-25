import {View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//각 길드의 랭킹정보(순위, 길드이름, 포인트)를 받아서 내린차순으로 정렬
//내 길드의 순위정보 제공

//랭킹 (임시)
const guildRankings = [
    { rank: 1, name: 'Guild A', points: 1500 },
    { rank: 2, name: 'Guild B', points: 1450 },
    
];

const GuildRanking = ( {goBack} ) =>{
    // const [guildRankings, setGuildRankings] = useState([]);

    /* useEffect(() => {
        fetchGuildRankings();
    }, []); */

    // const fetchGuildRankings = async () => {
    //     try {
    //         const options = {
    //             method: 'GET',
    //             url: '여기에 API 엔드포인트 URL을 입력하세요',
    //             
    //             params: { /* 여기에 필요한 쿼리 매개변수를 입력하세요 */ },
    //         };
    
    //         const response = await axios.request(options);
    //         const data = response.data;
    //         // 포인트가 높은 순으로 정렬
    //         const sortedData = data.sort((a, b) => b.points - a.points);
    //         setGuildRankings(sortedData);
    //     } catch (error) {
    //         console.error('랭킹정보를 가져오는 도중 에러발생', error);
    //     }
    // };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>뒤로</Text>
                </TouchableOpacity>
                <Text style={styles.title}>길드 랭킹</Text>
            </View>

            <ScrollView>
                {guildRankings.map((guild, index) => (
                    <View key={index} style={styles.rankingItem}>
                        <Text style={styles.rankingText}>{guild.rank}위      {guild.name}           포인트 : {guild.points}점</Text>
                    </View>
                ))}
            </ScrollView>

            {/* <ScrollView>
                {guildRankings.map((guild, index) => (
                    <View key={index} style={styles.rankingItem}>
                        
                        <Text style={styles.rankingText}>{index + 1}위      {guild.name}           포인트: {guild.points}점</Text>
                    </View>
                ))}
            </ScrollView> */}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 전체 화면을 사용하도록 설정
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
    rankingText: {
        fontSize: 16,
        color: '#333',
        // 추가적인 스타일링
    },
})

export default GuildRanking;