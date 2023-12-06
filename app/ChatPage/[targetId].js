import React, { useState, useEffect, useRef, useContext } from 'react';
import { SafeAreaView, TextInput, Button, FlatList, Text } from 'react-native';
import { LoadingScreen, UserContext, SocketContext, getData, postData } from '../../components'
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Icon_User from '../../assets/icons/Icon_User.png';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { useLocalSearchParams } from 'expo-router'

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;   

const ChatPage = () => {
    const targetId = Number(useLocalSearchParams().targetId);
    const { uid, nickname } = useContext(UserContext);
    const { socket, setInChat, stompClient, setStompClient } = useContext(SocketContext);
    const [roomId, setRoomId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const currentSubscription = useRef(null);

    const subscribeToTopic = (topic) => {
        currentSubscription.current = stompClient.subscribe(topic, (message) => {
            const receivedMessage = JSON.parse(message.body);
            if(receivedMessage.senderId != uid) {
                const newTime = new Date(receivedMessage.timestamp);
                console.log(newTime);
                const processedMessage = {
                    _id: receivedMessage.id || Math.random().toString(36).substring(10),    
                    text: receivedMessage.content,
                    createdAt: newTime,
                    user: {
                    _id: receivedMessage.senderId,
                    name: (receivedMessage.senderId == uid) ? 'MyName' : 'OtherName',
                    avatar: (!receivedMessage.avatar) ? Icon_User : receivedMessage.avatar,
                    },
                }
                console.log(processedMessage);
                setMessages(prevMessages => [...prevMessages, processedMessage]);
            }
            console.log('Received: ', message.body);
            console.log(message.body);
        });
      };

    const sendMessage = (messageContent) => {
        if (stompClient && stompClient.connected) {
    
            const messageToSend = {
                senderId: uid,
                content: messageContent[0].text,
                receiverId: targetId
            };
            stompClient.send(`/app/chat/${roomId}/sendMessage`, {}, JSON.stringify(messageToSend));

            const addMyMessage = {
                _id: Math.random().toString(36).substring(10),
                text: messageToSend.content,
                createdAt: new Date(),
                user: {
                  _id: uid,
                  name: 'MyName',
                  avatar: Icon_User,
                },
            }
            setMessages(prevMessages => [...prevMessages, addMyMessage]);
            
            setInputMessage('');
        } else {
            console.log("WebSocket is not connected.");
        }
    };

    useEffect(() => {
        setIsLoading(true);
        setInChat(true);
        console.log(uid, targetId);
        const fetchData = async () => {
            console.log(uid, targetId);
            const item = {
                oneId: uid,
                otherId: targetId,
            }
            try {
                const response = await getData(item, 'chatRoom/info/us');
                if(response == 'nothing') {
                    try {
                        const createRoom = await postData(item, 'chatRoom/create');
                        setRoomId(createRoom);
                    } catch (error) {
                        console.log(error);
                        setRoomId(null);
                    }    
                } else {
                    setRoomId(response);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        return () => {
            if (currentSubscription.current) {
                currentSubscription.current.unsubscribe();
                currentSubscription.current = null;
              }
            setInChat(false);
        }
    }, [])

    useEffect(() => {
        if(roomId != null) {
            subscribeToTopic(`/topic/chat.${roomId}`);
            const fetchData = async () => {
                try {
                    const loadMessage = await getData({roomId: roomId}, 'chatMessage');
                    const toTarget = `senderMemberId: ${uid}, sendingContent: ${nickname}님이 채팅을 시작했습니다.`
                    const response = await postData({memberId: targetId, message: toTarget}, 'notification/send');
                    const processedMessage = loadMessage.map(message => ({
                        _id: Math.random().toString(36).substring(10),
                        text: (message.content) ? message.content : '',
                        createdAt: new Date(message.timestamp),
                        user: {
                          _id: message.senderId,
                          name: (message.senderId == uid) ? 'MyName' : 'OtherName',
                          avatar: (!message.avatar) ? Icon_User : message.avatar,
                        }}))
                    console.log(roomId);
                    console.log(processedMessage.map(message => (console.log(message.user))))
                    console.log(processedMessage);
                    setMessages(processedMessage);
                } catch (error) {
                    console.log(error);
                    sendMessage([]);
                } finally {
                    setIsLoading(false);
                }
            }
            fetchData();
        }
    }, [roomId])

    const renderBubble = (props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                // 상대방 말풍선의 배경색 변경
                backgroundColor: '#FFFF99',
                marginBottom: 10,
              },
              right: {
                // 현재 사용자 말풍선의 배경색 변경 (선택 사항)
                backgroundColor: '#0084ff',
                marginBottom: 10,
              },
            }}
          />
        );
      }

    return (
        <>
            {(!isLoading) ? <GiftedChat
                messages={messages}
                onSend={newMessages => sendMessage(newMessages)}
                user={{ _id: uid }}
                inverted={false}
                renderBubble={renderBubble}
            /> : <LoadingScreen nowLoading={isLoading}/>}
        </>
    );
};
    
export default ChatPage;