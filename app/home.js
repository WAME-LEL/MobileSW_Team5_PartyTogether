import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import styles from '../constants/preset';

const Home = () => {
  const router = useRouter();

  return (
    <View>
      <Text>Home</Text>
        <Link href="MainPage">
          <Text style = {styles.middleFont}>메인 페이지로</Text>
        </Link>
        <Link href="PartyBoard">
          <Text style = {styles.middleFont}>게시판 페이지로</Text>
        </Link>
        <Link href="ChatPage">
          <Text style = {styles.middleFont}>채팅 페이지로</Text>
        </Link>
        <Link href="GPSPage">
          <Text style = {styles.middleFont}>GPS 시험 페이지</Text>
        </Link>
        <TouchableOpacity onPress = {() => (router.push('/Login/LoginPage'))}>
          <Text style = {styles.middleFont}>로그인 페이지로</Text>
        </TouchableOpacity>
        <Link href="EventPage">
          <Text style = {styles.middleFont}>이벤트 페이지로</Text>
        </Link>
        <Link href="TestPage">
          <Text style = {styles.middleFont}>테스트 페이지</Text>
        </Link>
        <Link href="Guild/GuildInformation">
          <Text style = {styles.middleFont}>길드 페이지</Text>
        </Link>
        <Link href="Guild/GuildSearch">
          <Text style = {styles.middleFont}>길드찾기 페이지</Text>
        </Link>
        <Link href="Guild/CreateGuild">
          <Text style = {styles.middleFont}>길드생성 페이지</Text>
        </Link>
        <Link href="ApiTest">
          <Text style = {styles.middleFont}>API 테스트 페이지</Text>
        </Link>
    </View>
  );
}

export default Home;