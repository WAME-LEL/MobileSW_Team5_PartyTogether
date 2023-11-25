import React, { useState } from 'react';
import UserContext from './UserContext';

export function UserProvider({ children }) {
  const [uid, setUid] = useState('1');

  return (
    <UserContext.Provider value={{uid, setUid}}>
      {children}
    </UserContext.Provider>
  );
}