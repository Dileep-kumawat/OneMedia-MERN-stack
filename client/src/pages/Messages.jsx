import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/messages/Sidebar'
import Main from '../components/messages/Main'
import axios from 'axios';

const Messages = () => {
    const [sidebar, setSidebar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatMode, setChatMode] = useState('group'); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/auth/profile', { withCredentials: true })
            .then(res => {
                setUser(res.data.user);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                navigate('/login');
            });
    }, [navigate]);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const handleChatModeChange = (mode) => {
        setChatMode(mode);
        if (mode === 'group') {
            setSelectedUser(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen dark:bg-slate-950 dark:text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='flex h-screen w-screen dark:bg-slate-950 dark:text-white'>
            <Sidebar 
                sidebar={sidebar} 
                setSidebar={setSidebar} 
                user={user}
                onUserSelect={handleUserSelect}
                onChatModeChange={handleChatModeChange}
                selectedUser={selectedUser}
                chatMode={chatMode}
            />
            <Main 
                sidebar={sidebar} 
                setSidebar={setSidebar} 
                user={user}
                selectedUser={selectedUser}
                chatMode={chatMode}
            />
        </div>
    )
}

export default Messages
