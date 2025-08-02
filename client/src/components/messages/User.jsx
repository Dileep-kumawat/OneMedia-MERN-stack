import React from 'react'

const User = ({ sidebar, setSidebar }) => {
    return (
        <div className={'p-3 flex items-center sm:justify-normal hover:bg-gray-400/20 cursor-pointer rounded-2xl' + (sidebar ? ' h-25 gap-10' : ' gap-3')}>
            <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg" alt="profile" className={'rounded-full overflow-hidden flex-shrink-0' + (sidebar ? ' size-15' : ' size-10')} />
            <div className={(sidebar ? ' text-2xl' : ' text-sm')}>
                <h1>Full name</h1>
                <h3 className='text-sm text-gray-600 line-clamp-1'>Fullname@gmail.com</h3>
            </div>
        </div>
    )
}

export default User
