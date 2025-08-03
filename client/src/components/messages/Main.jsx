import React from 'react'
import User from './User';

import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSend } from "react-icons/io";

const Main = ({ sidebar, setSidebar }) => {
    return (
        <div className='w-full h-screen flex flex-col'>
            <div className='flex gap-3 p-3 items-center border-b border-b-gray-300'>
                <GiHamburgerMenu onClick={() => {
                    setSidebar(!sidebar);
                }} className='block sm:hidden text-2xl' />
                <User />
            </div>
            <div className='h-full overflow-y-auto flex flex-col gap-5 p-3'>
                <div className='flex flex-row gap-2 items-center'>
                    <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg" alt="profile" className='size-11 rounded-full overflow-hidden flex-shrink-0' />
                    <div className='dark:bg-slate-800 bg-gray-400/20 rounded-2xl p-4 w-fit'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis similique ab cumque maxime, ullam neque.
                    </div>
                </div>
                <div className='flex flex-row-reverse gap-2 items-center'>
                    <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg" alt="profile" className='size-11 rounded-full overflow-hidden flex-shrink-0' />
                    <div className='bg-gray-400/20 dark:bg-slate-800 rounded-2xl p-4 w-fit'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis similique ab cumque maxime, ullam neque.
                    </div>
                </div>
            </div>
            <div className='h-20 bg-gray-400/30 dark:bg-slate-900/50 flex gap-5 items-center p-3'>
                <input type="text" className='outline-none w-full text-xl' placeholder='Type a message...'/>
                <button className='bg-gray-400 dark:bg-slate-800 p-3 rounded-2xl active:scale-90 hover:bg-slate-800/60 cursor-pointer'><IoIosSend className='text-3xl'/></button>
            </div>
        </div>
    )
}

export default Main
