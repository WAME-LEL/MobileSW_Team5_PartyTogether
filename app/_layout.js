import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";
import { UserProvider } from "../components";

const StackLayout = () => {
    const router = useRouter()
    return (
        <UserProvider>
            <Stack
                screenOptions = {{
                    headerStyle: {
                        backgroundColor:"#10101E"
                    },
                    headerTintColor:"#fff"
                }}
            >
                <Stack.Screen name = "Login/LoginPage"
                    options = {{
                        headerTitle: "Login",
                    }}
                />

                <Stack.Screen name="PartyBoard"
                            options={{
                                headerTitle: "파티 게시판",
                                headerTitleAlign: 'center'
                            }}
                />
                <Stack.Screen name="BoardWritePage/[gameName]"
                            options={{
                                headerTitle: "게시글 작성",
                                headerTitleAlign: 'center'
                            }}
                />
            </Stack>
        </UserProvider>
    )
}

export default StackLayout