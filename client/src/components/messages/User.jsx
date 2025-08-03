import React from 'react'

const User = ({ user, sidebar, setSidebar, onClick, isSelected, isOnline }) => {
    if (!user) {
        return null;
    }
    
    return (
        <div 
            className={`p-3 flex items-center sm:justify-normal hover:bg-gray-400/20 cursor-pointer rounded-2xl transition-colors ${
                isSelected ? 'bg-blue-500/20 border-l-4 border-blue-500' : ''
            } ${sidebar ? ' h-20 gap-4' : ' gap-3'}`}
            onClick={onClick}
        >
            <div className="relative">
                <img 
                    src={user.avatar || "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"} 
                    alt="profile" 
                    className={`rounded-full overflow-hidden flex-shrink-0 ${sidebar ? ' size-12' : ' size-10'}`} 
                    onError={(e) => {
                        e.target.src = "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg";
                    }}
                />
                {isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
            </div>
            <div className={`flex-1 ${sidebar ? ' text-base' : ' text-sm'}`}>
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold truncate">{user.fullname || 'Unknown User'}</h1>
                    {isOnline && (
                        <span className="text-xs text-green-500 font-medium">Online</span>
                    )}
                </div>
                <h3 className='text-sm text-gray-600 line-clamp-1'>{user.email || 'No email'}</h3>
            </div>
        </div>
    )
}

export default User
