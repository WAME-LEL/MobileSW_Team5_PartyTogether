import { Stack, useRouter } from "expo-router";
import styles from "../constants/preset";
import Icon_User from "../assets/icons/Icon_User.png";
import { UserProvider, ImageButton, SocketProvider } from "../components";

const StackLayout = () => {
    const router = useRouter()
    return (
        <UserProvider>
            <SocketProvider>
                <Stack
                    screenOptions = {{
                        headerStyle: {
                            backgroundColor:"#10101E",
                        },
                        headerTitleAlign: 'center',
                        headerTintColor:"#fff",
                        headerRight: () => (<ImageButton preset = {[{marginRight: 10}, styles.smallImageButton]} preset2 = {[styles.ImageButtonIn, {borderRadius: 20, backgroundColor: '#FFFFFF'}]} imageUrl = {Icon_User} handlePress = {() => {router.push("MyPage")}}/>)
                    }}
                >
                    <Stack.Screen name = "Login/LoginPage"
                        options = {{
                            headerTitle: "로그인",
                            headerRight: () => (null),
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name = "Login/SignUpPage"
                        options = {{
                            headerTitle: "회원가입",
                            headerRight: () => (null)
                        }}
                    />
                    <Stack.Screen name = "Login/GameInfoPage"
                        options = {{
                            headerTitle: "회원가입",
                            headerRight: () => (null)
                        }}
                    />
                    <Stack.Screen name="MainPage"
                                options={{
                                    headerTitle: "메인 페이지",
                                    headerLeft: () => (null)
                                }}
                    />
                    <Stack.Screen name="PartyBoard"
                                options={{
                                    headerTitle: "파티 게시판",
                                }}
                    />
                    <Stack.Screen name="BoardWritePage/[gameName]"
                                options={{
                                    headerTitle: "게시글 작성",
                                }}
                    />
                    <Stack.Screen name="ChatPage/[targetId]"
                                options={{
                                    headerTitle: "채팅",
                                }}
                    />
                    <Stack.Screen name="MyPage"
                                options={{
                                    headerTitle: "마이페이지",
                                }}
                    />
                    <Stack.Screen name="Guild/GuildInformation"
                                options={{
                                    headerTitle: "길드 페이지",
                                }}
                    />
                    <Stack.Screen name="Guild/GuildRanking"
                                options={{
                                    headerTitle: "길드 랭킹",
                                    headerShown: false,
                                }}
                    />
                    <Stack.Screen name="Guild/GuildSearch"
                                options={{
                                    headerTitle: "길드 찾기",
                                }}
                    />
                    <Stack.Screen name="Guild/CreateGuild"
                                options={{
                                    headerTitle: "길드 생성",
                                }}
                    />
                    <Stack.Screen name="Guild/guildMatch/CreateRoom"
                                options={{
                                    headerTitle: " ",
                                    headerShown: false,
                                }}
                    />
                    <Stack.Screen name="Guild/guildMatch/GuildMatch"
                                options={{
                                    headerTitle: "길드전",
                                    headerShown: false,
                                }}
                    />
                    <Stack.Screen name="Guild/guildMatch/MatchResult"
                                options={{
                                    headerTitle: "결과 확인",
                                    headerShown: false,
                                }}
                    />
                    <Stack.Screen name="Guild/GuildMenu"
                                options={{
                                    headerTitle: "길드 메뉴",
                                }}
                    />
                </Stack>
            </SocketProvider>
        </UserProvider>
    )
}

export default StackLayout