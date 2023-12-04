import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";
import styles from "../constants/preset";
import Icon_User from "../assets/icons/Icon_User.png";
import { UserProvider, ImageButton } from "../components";

const StackLayout = () => {
    const router = useRouter()
    return (
        <UserProvider>
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
                        headerRight: () => (null)
                    }}
                />
                <Stack.Screen name = "Login/SignUpPage"
                    options = {{
                        headerTitle: "회원가입",
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
                <Stack.Screen name="Guild/GuildInformation"
                            options={{
                                headerTitle: "길드 정보",
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
            </Stack>
        </UserProvider>
    )
}

export default StackLayout