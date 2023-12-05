import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TextInput, Button, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import { UserContext, getData } from '../../components'
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { useLocalSearchParams } from 'expo-router'

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const ChatScreen = () => {
    const { uid } = useContext(UserContext);
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const { targetId } = useLocalSearchParams();
    const [roomId, setRoomId] = useState(2);
    const [isLoading, setIsLoading] = useState(true);
    console.log(`UID : ${uid}, TargetID : ${targetId}`);
  
    const currentSubscription = useRef(null);
  
    // const memberId = 153;
  
    const connect = () => {
      const socket = new SockJS(`http://34.22.100.104:8080/chat`);
      const client = Stomp.over(socket);
      console.log(socket);
  
      client.connect({}, () => {
        setStompClient(client);
      }, (error) => {
        console.error('Connection error:', error);
      });
    };
  
    const subscribeToTopic = (topic) => {
      if (currentSubscription.current) {
        currentSubscription.current.unsubscribe();
      }
  
      currentSubscription.current = stompClient.subscribe(topic, (message) => {
        if(topic === `/topic/member.${uid}`){
          // 알람창 띄우기
          alert(message.body);
          Alert.alert('새 알림', message.body, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
          console.log('Received: ', message.body);
        }else{
          setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
        }
  
        console.log('Received: ', message.body);
        
        // 메시지 처리 로직
        console.log(message.body);
      });
    };
  
    useEffect(() => {
      // const fetchData = async () => {
      //     setIsLoading(true);
      //     try {
      //         const data = await getData({memberId : uid}, "chatRoom/info");
      //         console.log('data:', data);
      //         setRoomId(data[0].roomId)
      //     } catch(error) {
      //         console.log(error);
      //         return null;
      //     }
      //     setIsLoading(false);
      // }
      // fetchData();
    }, []);
  
    useEffect(() => {
      if(roomId != null) {
          connect();
          return () => {
            if (stompClient) {
              stompClient.disconnect();
            }
          };
      }
    }, [roomId])
  
    // 버튼 클릭에 따른 구독 스위치
    const switchSubscription = (newTopic) => {
      if (stompClient && stompClient.connected) {
        subscribeToTopic(newTopic);
      }
    };
  
    // 메시지 전송
  
    //         senderId: memberId,
    const sendMessage = (messageContent) => {
      if (stompClient && stompClient.connected) {
        const message = {
          roomId: roomId,
          senderId: uid,
          content: messageContent,
          receiverId: targetId
         };
        stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
        console.log(JSON.stringify(message));
        setInputMessage(''); // 입력 필드 초기화
      } else {
        console.log("WebSocket is not connected.");
      }
    };
  
  
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View style={styles.container}>
          <Button title="밑에 id 입력하고 클릭 후 채팅버튼" onPress={() => switchSubscription(`/topic/chat.2`)} />
          <Button title="알림 상태" onPress={() => switchSubscription(`/topic/member.${uid}`)} />
          <Text>{uid}</Text>
        </View>
        <Text></Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={uid}
        />
        <ScrollView style={{ flex: 1 }}>
          {messages.map((msg, index) => (
            <Text key={index} style={{ textAlign: 'left', margin: 5 }}>
              content:{msg.content} {/* 메시지 표시 부분 수정 */}
              memberId:{msg.senderId}
            </Text>
          ))}
        </ScrollView>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setInputMessage(text)}
          value={inputMessage}
        />
        <Button onPress={() => sendMessage(inputMessage)} title="Send" />
        <Button onPress={() => (console.log(`roomID: ${roomId}`))} title="RoomID 확인"/>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  
  export default ChatScreen;