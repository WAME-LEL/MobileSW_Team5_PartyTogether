import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { GiftedChat } from 'react-native-gifted-chat'
// import { Socket, io } from 'socket.io-client'

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const ChatPage = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);

  const connect = () => {
    var socket = new SockJS('http://34.22.100.104:8080/chat');
    const client = Stomp.over(socket);

    client.connect({}, function (frame) {
      client.subscribe('/topic/public', function (chatMessage) {
        const receivedMessage = JSON.parse(chatMessage.body);
        const formattedMessage = {
          _id: receivedMessage.id || Math.random().toString(36).substring(7),
          text: receivedMessage.content,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Someone',
          },
        };
        setMessages(prevMessages => GiftedChat.append(prevMessages, formattedMessage));
      });

      setStompClient(client);
    });
  };

  const onSend = (newMessages = []) => {
    newMessages.forEach(message => {
      sendMessage(message.text);
    });
  };

  const sendMessage = (messageContent) => {
    if (stompClient && stompClient.connected) {
      const message = { content: messageContent };
      stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
    } else {
      console.log("WebSocket is not connected.");
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatPage;