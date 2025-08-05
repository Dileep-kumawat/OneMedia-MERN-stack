import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth.context';
import { useSocket } from '../../context/Socket.context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { MdGroup } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import User from './User';

const Sidebar = ({ sidebar, setSidebar, user, onUserSelect, onChatModeChange, selectedUser, chatMode }) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { onlineUsers } = useSocket();

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(u => 
            u.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [users, searchTerm]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/messages/users', {
                withCredentials: true
            });
            if (response.data.success) {
                setUsers(response.data.data);
                setFilteredUsers(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserSelect = (selectedUser) => {
        onUserSelect(selectedUser);
        onChatModeChange('individual');
        if (window.innerWidth < 640) { 
            setSidebar(false);
        }
    };

    const handleGroupChatSelect = () => {
        onUserSelect(null);
        onChatModeChange('group');
        if (window.innerWidth < 640) { 
            setSidebar(false);
        }
    };

    const isUserOnline = (userId) => {
        return onlineUsers && onlineUsers.includes && onlineUsers.includes(userId);
    };

    return (
        <div className={'w-screen sm:w-1/3 dark:bg-slate-900 space-y-3 fixed sm:static top-0 -left-full sm:left-0 z-50' + (sidebar ? ' left-0' : '')}>
            <div className='flex flex-col h-screen'>
                <div className={'flex sm:justify-between items-center sm:px-10 p-4 h-20' + (sidebar ? ' justify-around' : ' justify-center')}>
                    <Link to="/"><IoMdHome className='text-4xl cursor-pointer hover:text-blue-500' /></Link>
                    <h1 className='text-3xl font-bold logoFont sm:pl-3'><span className='md'>One_Media</span></h1>
                    <RxCross1 className='block sm:hidden text-4xl cursor-pointer hover:text-red-500' onClick={() => {
                        setSidebar(!sidebar)
                    }} />
                </div>

                {/* Chat Mode Selector */}
                <div className='flex mx-5 mb-3 bg-gray-100 dark:bg-slate-800 rounded-2xl p-1'>
                    <button
                        onClick={handleGroupChatSelect}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl cursor-pointer transition-colors ${
                            chatMode === 'group' 
                                ? 'bg-blue-500 text-white' 
                                : 'hover:bg-gray-200 dark:hover:bg-slate-700'
                        }`}
                    >
                        <MdGroup className="text-lg" />
                        <span className={sidebar ? 'block' : 'hidden sm:block'}>Group</span>
                    </button>
                    <button
                        onClick={() => onChatModeChange('individual')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl cursor-pointer transition-colors ${
                            chatMode === 'individual' 
                                ? 'bg-blue-500 text-white' 
                                : 'hover:bg-gray-200 dark:hover:bg-slate-700'
                        }`}
                    >
                        <FaUser className="text-lg" />
                        <span className={sidebar ? 'block' : 'hidden sm:block'}>Individual</span>
                    </button>
                </div>

                {/* Search Bar */}
                {chatMode === 'individual' && (
                    <div className='flex bg-gray-100 dark:bg-slate-800 items-center gap-3 mx-5 rounded-2xl h-12 px-4'>
                        <IoSearch className='text-xl text-gray-500' />
                        <input 
                            type="text" 
                            className='w-full outline-none bg-transparent' 
                            placeholder='Search users...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                )}

                {/* Users List */}
                <div className='flex-1 overflow-y-auto px-4 mt-2 custom-scrollbar'>
                    {chatMode === 'group' ? (
                        <div className='p-4 text-center text-gray-500'>
                            <MdGroup className="text-6xl mx-auto mb-4 text-blue-500" />
                            <h3 className="text-lg font-semibold mb-2">Group Chat</h3>
                            <p className="text-sm">Chat with everyone in the group!</p>
                            <p className="text-xs mt-2">{onlineUsers.length} users online</p>
                        </div>
                    ) : (
                        <>
                            {filteredUsers.length === 0 ? (
                                <div className='p-4 text-center text-gray-500'>
                                    <FaUser className="text-4xl mx-auto mb-2" />
                                    <p>No users found</p>
                                </div>
                            ) : (
                                filteredUsers.map((u) => (
                                    <User 
                                        key={u._id}
                                        user={u}
                                        sidebar={sidebar} 
                                        setSidebar={setSidebar}
                                        onClick={() => handleUserSelect(u)}
                                        isSelected={selectedUser?._id === u._id}
                                        isOnline={isUserOnline(u._id)}
                                    />
                                ))
                            )}
                        </>
                    )}
                </div>

                {/* Current User Info */}
                <div className='px-4 py-3 flex items-center gap-3 border-t border-t-gray-500'>
                    <div className="relative">
                        <img 
                            src={user?.avatar || "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"} 
                            alt="profile" 
                            className='size-11 rounded-full overflow-hidden flex-shrink-0' 
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className={'lg:block' + (sidebar ? '' : ' hidden')} >
                        <h1 className="font-semibold">{user?.fullname}</h1>
                        <h3 className='text-sm text-gray-600 line-clamp-1'>{user?.email}</h3>
                    </div>
                    <button 
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }} 
                        className={'bg-red-600 sm:block text-white text-sm font-bold py-2 px-4 rounded-2xl hover:bg-red-500 cursor-pointer active:scale-95 ml-auto transition-all' + (sidebar ? '' : ' hidden')}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
