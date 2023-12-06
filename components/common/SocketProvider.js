import React, { useState, useEffect, useContext, useRef } from 'react';
import SocketContext from './SocketContext';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { TextEncoder, TextDecoder } from 'text-encoding';
import UserContext from './UserContext';
import ImageButton from './ImageButton';
import Icon_Close from '../../assets/icons/Icon_Close.png';
import Icon_Chatting from '../../assets/icons/Icon_Chatting.png';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

export function SocketProvider({ children }) {
  const { uid } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [inChat, setInChat] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const uidSubscription = useRef(null);
  const router = useRouter();

  const onUidsubscription = () => {
    uidSubscription.current = stompClient.subscribe(`/topic/member.${uid}`, (message) => {
        console.log(message);
        const memberIdRegex = /senderMemberId\s*:\s*(\d+)/;
        const contentRegex = /sendingContent:\s*([^\n]+)/;
        const modalText = message.body;
        console.log(modalText);
        const memberIdMatch = modalText.match(memberIdRegex);
        const contentMatch = modalText.match(contentRegex);
        const item = {
            memberId : memberIdMatch ? memberIdMatch[1] : null,
            content : contentMatch ? contentMatch[1] : null
        }
        console.log(item);
        setModalMessage(item);
        setModalVisible(true);
    })  
  }

  const offUidsubscription = () => {
    if(uidSubscription.current) {
        uidSubscription.current.unsubscribe();
        uidSubscription.current = null;
    }
  }
  const connect = () => {
    const client = Stomp.over(socket);

    client.connect({}, () => {
      setStompClient(client);
    }, (error) => {
      console.error('Connection error:', error);
    });
  };

  useEffect(() => {
    if(socket != null) {
        connect();
        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
            }
        }
    }
  }, [socket])

  useEffect(() => {
    if(inChat == true) {
        offUidsubscription();
    } else {
        if(uidSubscription.current == null && stompClient != null) {
            onUidsubscription();
        }
    }
  }, [uid, inChat, stompClient])

  const goChat = () => {
    setInChat(true);
    setModalVisible(false);
    router.push(`ChatPage/${modalMessage.memberId}`);
  }

  return (
    <SocketContext.Provider value={{socket, setSocket, stompClient, setStompClient, setInChat}}>
        <Modal
            animationIn="slideInDown"
            animationOut="slideOutUp"
            isVisible={modalVisible}
            backdropOpacity={0.05}
            style={styles.modalStyle}
        >
            <View style = {styles.container}>
                <View style = {styles.inView}>
                    <View style = {styles.secondView}>
                        <View style = {[styles.inContainer, {borderBottomColor: '#CCCCCC', borderBottomWidth:1}]}>
                        <Text style = {styles.modalText}>{modalMessage.content}</Text>
                        </View>
                        <View style = {styles.inContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => goChat()}
                        >
                            <Image source = {Icon_Chatting} style = {{width: '100%', height: '100%'}} resizeMode = "contain" ></Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, {marginLeft: width * 0.1}]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Image source = {Icon_Close} style = {{width: '100%', height: '100%'}} resizeMode = "contain" ></Image>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            </Modal>
      {children}
    </SocketContext.Provider>
  );
}

const styles = StyleSheet.create({
    modalStyle: {
        margin: 0,
        justifyContent: 'flex-start',
    },
    container: {
        alignItems: 'center',
    },
    inView: {
        width: width * 0.9,
        height: height * 0.15,
        backgroundColor: "#CCCCCC",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 5,
    },
    secondView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    }, 
    inContainer: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: '50%',
    },
    modalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center', // 센터 정렬
        alignItems: 'center', // 센터 정렬
    },
});