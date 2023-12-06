import React, { useState } from 'react';
import UserContext from './UserContext';

export function UserProvider({ children }) {
  const [uid, setUid] = useState(null);
  const [nickname, setNickname] = useState('');

  return (
    <UserContext.Provider value={{uid, setUid, nickname, setNickname}}>
      {children}
    </UserContext.Provider>
  );
}