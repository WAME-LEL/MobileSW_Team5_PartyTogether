import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
        <Link href="PartyBoard">
          <Text>게시판 페이지로</Text>
        </Link>
        <Link href="Guild/GuildInformation">
          <Text>길드 페이지</Text>
        </Link>
        <Link href="Guild/GuildSearch">
          <Text>길드찾기 페이지</Text>
        </Link>
        <Link href="Guild/CreateGuild">
          <Text>길드생성 페이지</Text>
        </Link>
    </View>
  );
}

export default Home;