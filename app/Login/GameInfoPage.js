import react, { useState, useEffect } from 'react';
import { Text, View, FlatList, SafeAreaView, CheckBox } from 'react-native';

const GameInfoPage = () => {
    const [games, setGames] = useState(["리그오브레전드", "메이플스토리", "로스트아크", "카트라이더", "원신", "얼불춤"]);
    const [checked, setChecked] = useState(false);
    
    return (
    <SafeAreaView>
        <Text>게임 정보 페이지</Text>
        <FlatList
            data = {games}
            renderItem = {({item}) =>
                <View style = {{flexDirection: 'row', margin: 10}}>
                    <CheckBox
                        value={checked}
                        onValueChange={setChecked}
                        style = {{marginRight : 5}}
                    />
                    <Text>{item}</Text>
                </View>}
        />
    </SafeAreaView>
    );
}

export default GameInfoPage;