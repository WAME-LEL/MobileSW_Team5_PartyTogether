import { useState, useEffect, useContext } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native'
import { BoardCard, getData, BoardModal, LoadingScreen, UserContext, CommonButton, ImageButton } from "../components"
import { useRouter } from 'expo-router';
import Icon_LeftArrow from '../assets/icons/Icon_LeftArrow.png';
import Icon_RightArrow from '../assets/icons/Icon_RightArrow.png';
import styles from '../constants/preset';

const { width, height } = Dimensions.get('window');

const PartyBoard = () => {
  const router = useRouter();
  const { uid } = useContext(UserContext) // 로그인 정보 저장용
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리 ture = 로딩중, false = 로딩 완료
  const [gameBoardData, setGameBoardData] = useState(['리그오브레전드', '메이플스토리', 'FIFA']); // 게임 목록 배열
  const [nowGameBoard, setNowGameBoard] = useState('리그오브레전드'); // 현재 출력할 게시판
  const [data, setData] = useState([]) // 데이터 관리 배열
  const [currentData, setCurrentData] = useState(0);
  const [page, setPage] = useState(0) // 페이지 관리 숫자
  const [entity, setEntity] = useState(10) // 페이지 한 번에 가져올 데이터 수
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => { // 게시판이 바뀔 때 마다 데이터를 갱신
      setIsLoading(true);
      setPage(0);
      const item = {
        keyword: nowGameBoard
      }
      const nowDate = new Date();
      try {
        const loadData = await getData(item, "board");
        console.log(loadData);
        const processedData = loadData.map((item) => ({
          ...item,
          time: new Date(item.time),
          processedTime: dateToString((nowDate - new Date(item.time)) / 1000)
        }));
        processedData.sort((a, b) => b.time - a.time);
        setData(processedData);
      } catch (error) {
        setData([]);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [nowGameBoard]) // 게시판, 페이지, 데이터 수가 바뀌면 갱신하는데, 페이지와 데이터 수를 초기화 하는 과정 추가 필요

  const dateToString = (date) => { // 계산한 초를 보기 쉽게 변환
    const localTime = date - 32400; // 서버랑 시간이 9시간 차이남
    console.log(localTime);
    if(localTime < 60) {
      return `${Math.floor(localTime)}초 전`;
    } else if(localTime >= 60 && localTime < 3600) {
      return `${Math.floor(localTime / 60)}분 전`;
    } else if(localTime >= 3600 && localTime < 86400) {
      return `${Math.floor(localTime / 3600)}시간 전`;
    } else {
      return `${Math.floor(localTime / 86400)}일 전`;
    }
  }

  useEffect(() => { // 처음 로딩될 때 DB의 전체 게임 목록을 가져옴
    const fetchData = async () => {
      const loadData = await getData({}, "game");
      setGameBoardData(loadData);
    }
    fetchData();
  }, [])

  const pressGameBoard = async (gameName) => { // 게임 목록을 클릭하면 데이터를 갱신할 함수
    setNowGameBoard(gameName);
  }

  const handlePaging = (upDown) => {
    console.log('페이지 변경 요청');
    if(upDown == 'Down') {
      if(page == 0) {
        console.log('첫 페이지');
      } else {
        setPage(page - 1);
      }
    } else {
      if(data.length < (page + 1) * entity) {
        console.log('마지막 페이지');
      } else {
        setPage(page + 1);
      }
    }
  }

  const printingModal = async (index) => { // 게시판 카드를 누를 경우 모달 상태 활성화
    console.log('게시판 카드 누름');
    console.log(index);
    await setCurrentData(index);
    toggleModal();
  };

  const toggleModal = () => { // 모달 상태 변경
    setModalVisible(!modalVisible);
  }

  const handleChat = (targetId) => { // 채팅 페이지로 이동, 내가 쓴 글이면 이동하지 않음
    if(targetId == uid) {
      alert('내가 쓴 글입니다.');
    } else {
      toggleModal();
      router.push(`ChatPage/${targetId}`)
    } 
  }

  return (
      <SafeAreaView>
          <LoadingScreen nowLoading = {isLoading} />
          {(!isLoading && data.length != 0) ? <BoardModal items = {data[currentData]} visible={modalVisible} onClose={toggleModal} handleChat = {() => handleChat(data[currentData].memberId)} /> : <></>}
          <View style = {[styles.container, {marginHorizontal: width * 0.01,height: height * 0.08}]}>
            <FlatList
                data = {gameBoardData}
                showsHorizontalScrollIndicator = {false}
                renderItem={({ item }) => <TouchableOpacity style = {styles.gameNameBox} 
                onPress = {() => pressGameBoard(item.title)}
                ><Text style = {styles.smallFont}>{item.title}</Text></TouchableOpacity>}
                keyExtractor={item => item.id}
                horizontal
            />
          </View>
          <View style={{ borderBottomColor: '#999999', borderBottomWidth: 1, marginHorizontal: width * 0.01, marginBottom: height * 0.01}} />
          <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.02}}>
            <Text style = {styles.middleFont}>{nowGameBoard} 게시판</Text>
            <CommonButton 
              preset = {styles.smallButton}
              font = {{fontSize: 15, color: '#FFFFFF'}}
              handlePress = {() => router.push(`BoardWritePage/${nowGameBoard}`)}
              title = "게시글 작성"/>
          </View>
          <View style = {{ borderBottomColor: '#999999', borderBottomWidth: 1, marginHorizontal: width * 0.01, marginVertical: height * 0.01}} />
          <View style = {{height: height * 0.7, marginBottom: height * 0.02 }}>
            <FlatList
                data={data.slice((page) * entity, (page + 1) * entity)}
                showsVerticalScrollIndicator = {false}
                renderItem={({ item, index }) => (
                <BoardCard 
                  items={item}
                  handlePress={() => printingModal(index)}
                />
                )}
                keyExtractor={index => index.id}
            />
          </View>
          <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: height * 0.01 }}>
            {!(page < 1) ? 
            <ImageButton
              preset = {[styles.smallImageButton, {width: 20, height: 20, backgroundColor: 'none', position: 'absolute', Left: '35%'}]}
              preset2 = {[styles.ImageButtonIn, {backgroundColor: 'none'}]}
              imageUrl = {Icon_LeftArrow}
              handlePress = {() => handlePaging('Down')}
            /> : <></>}
            <View style = {[styles.smallImageButton, {width: 30, height: 30, backgroundColor: 'none', position: 'absolute', Left: '50%'}]}>
              <Text style = {[styles.middleFont, {fontWeight: 'none'}]}>{page + 1}</Text>
            </View>
            {(data.length > (page + 1) * entity) ? 
            <ImageButton
              preset = {[styles.smallImageButton, {width: 20, height: 20, backgroundColor: 'none', position: 'absolute', right: '35%'}]}
              preset2 = {[styles.ImageButtonIn, {backgroundColor: 'none'}]}
              imageUrl = {Icon_RightArrow}
              handlePress = {() => handlePaging('Up')}
            /> : <></>}
          </View>
      </SafeAreaView>
    );
}

export default PartyBoard