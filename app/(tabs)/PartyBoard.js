import { useState } from 'react'
import { Text, View, SafeAreaView, FlatList } from 'react-native'
import BoardCard from "../../components/common/BoardCard"

const PartyBoard = ({ party }) => {
    //const {uid} = useContext(AuthContext) // 로그인 정보 저장용
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리 ture = 로딩중, false = 로딩 완료
    const [gameBoardData, setGameBoardData] = useState(['리그오브레전드', '메이플스토리', '로스트아크']);
    const [data, setData] = useState([{
        id: '1',
        imageUrl: 'https://via.placeholder.com/150',
        nickname: '사용자1',
        time: '1시간 전',
        content: '안녕하세요, 첫 번째 게시물입니다.',
        openChat: '오픈챗 링크1',
      },
      {
        id: '2',
        imageUrl: 'https://via.placeholder.com/150',
        nickname: '사용자2',
        time: '2시간 전',
        content: '여기는 두 번째 게시물입니다.',
        openChat: '오픈챗 링크2',
      },]) // 데이터 관리 배열
    const [page, setPage] = useState(1) // 페이지 관리 숫자
    const [entity, setEntity] = useState(10) // 페이지 한 번에 가져올 데이터 수

    return (
        <SafeAreaView>
            <Text>게시판 페이지</Text>
            <FlatList
                data = {gameBoardData}
                renderItem={({ item }) => <View style = {{backgroundColor: "#AAAAAA", borderRadius: 5, padding: 10, margin: 10}}
                ><Text>{item}</Text></View>}
                keyExtractor={item => item.id}
                horizontal
            />
            <FlatList
                data={data}
                renderItem={({ item }) => <BoardCard items={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
      );
}

export default PartyBoard