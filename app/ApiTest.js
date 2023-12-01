import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatScreen = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const connect = () => {
    var socket = new SockJS('http://34.22.100.104:8080/chat');
    const client = Stomp.over(socket);

    client.connect({}, function (frame) {
      client.subscribe('/topic/public', function (chatMessage) {
        const receivedMessage = JSON.parse(chatMessage.body);
        setMessages(prevMessages => [...prevMessages, receivedMessage]);
      });

      setStompClient(client);
    });
  };

  const sendMessage = (messageContent) => {
    if (stompClient && stompClient.connected) {
      const message = { content: messageContent };
      stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
      setInputMessage(''); // 입력 필드 초기화
    } else {
      console.log("WebSocket is not connected.");
    }
  };

  useEffect(() => {
    connect();

    // 연결 해제 함수를 반환하여 컴포넌트 언마운트 시 연결을 해제할 수 있도록 합니다.
    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView style={{ flex: 1 }}>
        {messages.map((msg, index) => (
          <Text key={index} style={{ textAlign: 'left', margin: 5 }}>
            {msg.content} {/* 메시지 표시 부분 수정 */}
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

export default ChatScreen;
