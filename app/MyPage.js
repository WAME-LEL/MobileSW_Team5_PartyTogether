import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { UserContext, LoadingScreen } from '../components'
import Icon_User from '../assets/icons/Icon_User.png'

const { width, height } = Dimensions.get('window');

const MyPage = () => {
    const { uid } = useContext(UserContext);
    const [nickname, setNickname] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([{label: "라벨1", value: "밸류1"}]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // uid를 통해 정보 불러오기
                setNickname('닉네임');
                setImageUri(Icon_User);
            } catch (error) {
                alert("마이페이지 로딩 중 오류 발생");
            }
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return (
        <SafeAreaView>
            <LoadingScreen nowLoading = {isLoading} />
            {!isLoading ? 
            <>
                <View style = {styles.headerView}>
                    <View style = {styles.imageContainer}>
                        <Image 
                            source={Icon_User}
                            style = {{width: '100%', height: '100%', resizeMode: 'contain'}}
                        />
                    </View>
                    <View style = {styles.textBox}>
                        <Text style = {styles.titleFont}>닉네임 : </Text>
                        <Text style = {styles.contentFont}>{nickname}</Text>
                    </View>
                </View>
                <View style = {styles.middleView}>
                    <View style = {styles.menuView}>
                        <TouchableOpacity style = {styles.menuBox}>
                            <Text style = {styles.titleFont}>내 글</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.menuBox}>
                            <Text style = {styles.titleFont}>내 채팅</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.menuBox}>
                            <Text style = {styles.titleFont}>환경설정</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.contentView}>
                        {items.map((item, index) => (
                            <TouchableOpacity key = {index} style = {styles.contentBox}>
                                <Text style = {styles.titleFont}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </> : <></>}
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerView: {
        width: width,
        height: height * 0.2,
        flexDirection:'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    middleView: {
        width: width,
        height: height * 0.7,
        flexDirection:'row',
    },
    menuView: {
        width: '35%',
        height: '100%',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: 'black',
        backgroundColor: '#EEEEEE'
    },
    contentView: {
        width: '65%',
        height: '100%',
        alignItems: 'center',
    },
    imageContainer: {
        width: '35%', 
        height: 'auto', 
        backgroundColor: '#DDDDDD', 
        padding: '3%',
        borderRightColor: 'black',
        borderRightWidth: 1,
    },
    textBox: {
        width: '65%', 
        height: '50%', 
        padding: '3%',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    menuBox: {  
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    contentBox: {
        width: '95%',
        height: '9%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: '1%'
    },
    titleFont: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    contentFont: {
        fontSize: 20,
        fontWeight: 'normal'
    }
})

export default MyPage