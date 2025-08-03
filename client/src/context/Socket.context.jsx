import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './Auth.context';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    let newSocket;
    
    if (user) {
      newSocket = io('http://localhost:3000', {
        withCredentials: true,
      });

      setSocket(newSocket);

      newSocket.emit('addUser', user._id);

      newSocket.on('getUsers', (users) => {
        setOnlineUsers(users);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
      
      newSocket.on('connect_failed', (error) => {
        console.error('Socket connection failed:', error);
      });
    }

    return () => {
      if (newSocket) {
        newSocket.close();
        setSocket(null);
      }
    };
  }, [user]);

  const value = {
    socket,
    onlineUsers,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
