import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
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
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    let newSocket;

    if (user) {
      newSocket = io('http://localhost:3000', {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        timeout: 10000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      });

      window.socket = newSocket;

      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('✅ Socket connected: ', newSocket.id);
        setIsConnected(true);
        newSocket.emit('addUser', user._id);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });

      newSocket.on('getUsers', (users) => {
        setOnlineUsers(users);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setIsConnected(false);
      });

      newSocket.on('connect_failed', (error) => {
        console.error('Socket connection failed:', error);
        setIsConnected(false);
      });
    }

    return () => {
      if (newSocket) {
        newSocket.close();
        setSocket(null);
        setIsConnected(false);
      }
    };
  }, [user]);

  const value = {
    socket,
    onlineUsers,
    isConnected,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
