import React, { useEffect, useState, useRef } from 'react'
import User from './User';
import { useSocket } from '../../context/Socket.context';
import axios from 'axios';

import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSend } from "react-icons/io";
import { MdGroup } from "react-icons/md";

const Main = ({ sidebar, setSidebar, user, selectedUser, chatMode }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const { socket } = useSocket();

    useEffect(() => {
        if (socket && user) {
            const handleMessage = (data) => {
                setMessages((prev) => [...prev, {
                    senderId: data.senderId,
                    senderName: data.senderName,
                    senderAvatar: data.senderAvatar,
                    message: data.message,
                    timestamp: data.timestamp
                }]);
            };

            const handleGroupMessage = (data) => {
                if (chatMode === 'group') {
                    setMessages((prev) => [...prev, {
                        senderId: data.senderId,
                        senderName: data.senderName,
                        senderAvatar: data.senderAvatar,
                        message: data.message,
                        timestamp: data.timestamp
                    }]);
                }
            };

            const handleTyping = ({ isTyping }) => {
                setIsTyping(isTyping);
            };

            socket.on('getMessage', handleMessage);
            socket.on('getGroupMessage', handleGroupMessage);
            socket.on('userTyping', handleTyping);

            return () => {
                socket.off('getMessage', handleMessage);
                socket.off('getGroupMessage', handleGroupMessage);
                socket.off('userTyping', handleTyping);
            };
        }
    }, [socket, user, chatMode]);

    useEffect(() => {
        loadMessages();
    }, [chatMode, selectedUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const loadMessages = async () => {
        try {
            if (chatMode === 'group') {
                const response = await axios.get('http://localhost:3000/api/messages/group/messages', {
                    withCredentials: true
                });
                if (response.data.success) {
                    setMessages(response.data.data.map(msg => ({
                        senderId: msg.senderId._id,
                        senderName: msg.senderId.fullname,
                        senderAvatar: msg.senderId.avatar,
                        message: msg.message,
                        timestamp: msg.createdAt
                    })));
                }
            } else if (selectedUser) {
                const response = await axios.get(`http://localhost:3000/api/messages/conversation/${selectedUser._id}`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    setMessages(response.data.data.map(msg => ({
                        senderId: msg.senderId._id,
                        senderName: msg.senderId.fullname,
                        senderAvatar: msg.senderId.avatar,
                        message: msg.message,
                        timestamp: msg.createdAt
                    })));
                }
            } else {
                setMessages([]);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
            setMessages([]);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            if (chatMode === 'group') {
                await axios.post('http://localhost:3000/api/messages/group/send', {
                    message: newMessage
                }, { withCredentials: true });

                if (socket) {
                    socket.emit('sendGroupMessage', {
                        senderId: user._id,
                        message: newMessage,
                        senderName: user.fullname,
                        senderAvatar: user.avatar
                    });
                }
            } else if (selectedUser) {
                await axios.post(`http://localhost:3000/api/messages/send/${selectedUser._id}`, {
                    message: newMessage
                }, { withCredentials: true });

                if (socket) {
                    socket.emit('sendMessage', {
                        senderId: user._id,
                        receiverId: selectedUser._id,
                        message: newMessage,
                        senderName: user.fullname,
                        senderAvatar: user.avatar
                    });
                }

            }

            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
        
        if (socket && selectedUser && chatMode === 'individual') {
            socket.emit('typing', {
                receiverId: selectedUser._id,
                isTyping: e.target.value.length > 0
            });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const getChatTitle = () => {
        if (chatMode === 'group') {
            return (
                <div className="flex items-center gap-2">
                    <MdGroup className="text-2xl" />
                    <span>Group Chat</span>
                </div>
            );
        } else if (selectedUser) {
            return (
                <div className="flex items-center gap-2">
                    <img
                        src={selectedUser.avatar || "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"}
                        alt="profile"
                        className='size-10 rounded-full overflow-hidden flex-shrink-0'
                    />
                    <div>
                        <h3 className="font-semibold">{selectedUser.fullname}</h3>
                        {isTyping && <p className="text-sm text-gray-500">typing...</p>}
                    </div>
                </div>
            );
        } else {
            return <span>Select a chat</span>;
        }
    };

    return (
        <div className='w-full h-screen flex flex-col border-l border-l-gray-400 custom-scrollbar'>
            <div className='flex gap-3 p-3 items-center border-b border-b-gray-300'>
                <GiHamburgerMenu onClick={() => {
                    setSidebar(!sidebar);
                }} className='block sm:hidden text-2xl cursor-pointer' />
                {getChatTitle()}
            </div>
            
            <div className='h-full overflow-y-auto flex flex-col gap-3 p-3 custom-scrollbar'>
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        {chatMode === 'group' ? 'No group messages yet' : 
                         selectedUser ? 'No messages yet' : 'Select a user to start chatting'}
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex flex-row ${msg.senderId === user._id ? 'flex-row-reverse' : 'flex-row'} gap-2 items-start`}
                        >
                            <img
                                src={msg.senderAvatar || "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"}
                                alt="profile"
                                className='size-8 rounded-full overflow-hidden flex-shrink-0'
                            />
                            <div className={`max-w-xs lg:max-w-md ${msg.senderId === user._id ? 'text-right' : 'text-left'}`}>
                                {chatMode === 'group' && msg.senderId !== user._id && (
                                    <p className="text-xs text-gray-500 mb-1">{msg.senderName}</p>
                                )}
                                <div className={`dark:bg-slate-800 bg-gray-400/20 rounded-2xl p-3 w-fit ${msg.senderId === user._id ? 'ml-auto bg-blue-500 text-white' : ''}`}>
                                    {msg.message}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <div className='h-15 bg-gray-400/30 dark:bg-slate-900/50 flex gap-3 items-center p-3'>
                <input
                    type="text"
                    className='outline-none w-full text-lg p-2 rounded-lg bg-transparent'
                    placeholder={chatMode === 'group' ? 'Type a group message...' : selectedUser ? `Message ${selectedUser.fullname}...` : 'Select a chat to start messaging...'}
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={!selectedUser && chatMode !== 'group'}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || (!selectedUser && chatMode !== 'group')}
                    className='bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded-2xl active:scale-90 cursor-pointer transition-colors'
                >
                    <IoIosSend className='text-2xl' />
                </button>
            </div>
        </div>
    )
}

export default Main
