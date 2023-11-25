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
            </Stack>
        </UserProvider>
    )
}

export default StackLayout