import React, { useState, useEffect, useRef, useContext } from 'react';
import { LoadingScreen, UserContext, SocketContext, getData, postData } from '../../components'
import Icon_User from '../../assets/icons/Icon_User.png';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { useLocalSearchParams } from 'expo-router'

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;   

const ChatPage = () => {
    const targetId = Number(useLocalSearchParams().targetId);
    const { uid, nickname } = useContext(UserContext); // 유저 정보
    const { setInChat, stompClient } = useContext(SocketContext); // 소켓
    const [roomId, setRoomId] = useState(null); // 채팅방 id
    const [isLoading, setIsLoading] = useState(true); // 로딩
    const [messages, setMessages] = useState([]); // 출력할 메세지 배열
    const [inputMessage, setInputMessage] = useState(''); // 
    const currentSubscription = useRef(null);

    const subscribeToTopic = (topic) => { // 채팅 페이지 처음 입장 시, id에 걸려있던 구독 해제 후 방에 구독을 검
        currentSubscription.current = stompClient.subscribe(topic, (message) => {
            const receivedMessage = JSON.parse(message.body);
            if(receivedMessage.senderId != uid) { // 내가 보낸 메세지가 돌아왔을때에는 표시하지 않음
                const newTime = new Date(receivedMessage.timestamp);
                const processedMessage = { // GiftedChat에 맞는 형식으로 변경
                    _id: receivedMessage.id || Math.random().toString(36).substring(10), // 현재 서버에 채팅 id값이 없더라
                    text: receivedMessage.content,
                    createdAt: newTime,
                    user: {
                    _id: receivedMessage.senderId,
                    name: (receivedMessage.senderId == uid) ? 'MyName' : 'OtherName',
                    avatar: (!receivedMessage.avatar) ? Icon_User : receivedMessage.avatar,
                    },
                }
                setMessages(prevMessages => [...prevMessages, processedMessage]); // 메세지를 배열에 추가
            }
        });
      };

    const sendMessage = (messageContent) => { // 채팅을 보내는 함수
        if (stompClient && stompClient.connected) {
            const messageToSend = {
                senderId: uid,
                content: messageContent[0].text,
                receiverId: targetId
            };
            stompClient.send(`/app/chat/${roomId}/sendMessage`, {}, JSON.stringify(messageToSend));
            // 서버로 메세지 전송
            const addMyMessage = { // 보낸 메세지를 즉시 화면에 표시, 소켓을 통해 돌아오면 딜레이가 있음
                _id: Math.random().toString(36).substring(10),
                text: messageToSend.content,
                createdAt: new Date(),
                user: {
                  _id: uid,
                  name: 'MyName',
                  avatar: Icon_User,
                },
            }
            setMessages(prevMessages => [...prevMessages, addMyMessage]); // 메세지를 배열에 추가
            setInputMessage(''); // 현재 메세지 초기화
        } else {
            console.log("WebSocket is not connected.");
        }
    };

    useEffect(() => {
        setIsLoading(true); // 로딩
        setInChat(true); // SocketContext에서 uid에 구독이 걸지 설정하는 함수, 여기서는 방에 구독을 걸기 때문에 일시적으로 해제
        const fetchData = async () => {
            const item = {
                oneId: uid,
                otherId: targetId,
            }
            try {
                const response = await getData(item, 'chatRoom/info/us'); // 방이 이미 있는지 확인
                if(response == 'nothing') { // 없음
                    try {
                        const createRoom = await postData(item, 'chatRoom/create'); // 방을 생성
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
                    const loadMessage = await getData({roomId: roomId}, 'chatMessage'); // 채팅방 기록 가져옴
                    const toTarget = `senderMemberId: ${uid}, sendingContent: ${nickname}님이 채팅을 시작했습니다.` // 전송할 알림 내용 
                    const response = await postData({memberId: targetId, message: toTarget}, 'notification/send'); // 상대방에게 알림 전송
                    const processedMessage = loadMessage.map(message => ({ // 가져온 채팅 기록 가공
                        _id: Math.random().toString(36).substring(10),
                        text: (message.content) ? message.content : '',
                        createdAt: new Date(message.timestamp),
                        user: {
                          _id: message.senderId,
                          name: (message.senderId == uid) ? 'MyName' : 'OtherName',
                          avatar: (!message.avatar) ? Icon_User : message.avatar,
                        }}))
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
                // 현재 사용자 말풍선의 배경색 변경
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