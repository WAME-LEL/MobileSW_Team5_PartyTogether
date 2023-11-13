import React, { useState } from 'react'
import { Text, SafeAreaView, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

export default function App() {
  const [messages, setMessages] = useState([]);

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, []);

  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
  };

  return (
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
        _id: 1,
    }}
    />
  );
}
