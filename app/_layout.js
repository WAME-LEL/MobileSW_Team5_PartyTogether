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
            </Stack>
        </UserProvider>
    )
}

export default StackLayout