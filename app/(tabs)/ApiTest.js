import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const GameListScreen = () => {
    const [games, setGames] = useState([]);

    const getGameList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/game');
            console.log(response)
            return response.data; // API에서 반환된 데이터
        } catch (error) {
            console.error('There was an error!', error);
        }
    };


    useEffect(() => {
        getGameList().then(data => {
            console.log(data.data);
            setGames(data.data);
        });
    }, []);

    return (
        <View>
            {games.map(game => (
                <Text key={game.id}>{game.id} {game.title}</Text>
            ))}
        </View>
    );
};

export default GameListScreen;
