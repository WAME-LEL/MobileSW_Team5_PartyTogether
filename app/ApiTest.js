import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TextInput, Button, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import { UserContext } from '../components'
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { TextEncoder, TextDecoder } from 'text-encoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const ChatScreen = () => {
  const { uid } = useContext(UserContext);
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [memberId, setMemberId] = useState(153);
  const [roomId, setRoomId] = useState(1);

  const currentSubscription = useRef(null);

  // const memberId = 153;

  const connect = () => {
    const socket = new SockJS('http://192.168.50.28:8080/chat');
    const client = Stomp.over(socket);

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
      if (topic === `/topic/member.${memberId}`) {
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
      } else {
        setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
      }

      console.log('Received: ', message.body);

      // 메시지 처리 로직
      console.log(message.body);
    });
  };

  useEffect(() => {
    connect();
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

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
        senderId: memberId,
        content: messageContent,
      };
      //roomid와 일치하는 채팅방에 메시지 전송
      stompClient.send(`/app/chat/${roomId}/sendMessage`, {}, JSON.stringify(message));
      console.log(JSON.stringify(message));
      setInputMessage(''); // 입력 필드 초기화
    } else {
      console.log("WebSocket is not connected.");
    }
  };


  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={styles.container}>
        <Button title="밑에 id 입력하고 클릭 후 채팅버튼" onPress={() => switchSubscription('/topic/public')} />
        <Button title="알림 상태" onPress={() => switchSubscription(`/topic/member.${memberId}`)} />
        <Button title="채팅방" onPress={() => switchSubscription(`/topic/chat.${roomId}`)} /> 

        <Text>memberId:{memberId}</Text>
        <Text>roomId:{roomId}</Text>
      </View>
      <Text>설정할 memberId</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setMemberId(text)}
        value={memberId}
      />

      <Text>설정할 roomId</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setRoomId(text)}
        value={roomId}
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
