import { Link } from 'react-router';
import { useAuth } from '../../context/Auth.context';

import { useNavigate } from 'react-router-dom';

import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import User from './User';

const user = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9];

const Sidebar = ({ sidebar, setSidebar }) => {

    const navigate = useNavigate();

    const { logout } = useAuth();


    return (
        <div className={'w-screen sm:w-1/3 dark:bg-slate-900 space-y-3 fixed sm:static top-0 -left-full sm:left-0' + (sidebar ? ' left-0' : '')}>
            <div className='flex flex-col h-screen'>
                <div className={'flex sm:justify-between items-center sm:px-10 p-4 h-20' + (sidebar ? ' justify-around' : ' justify-center')}>
                    <Link to="/"><IoMdHome className='text-4xl cursor-pointer' /></Link>
                    <h1 className='text-3xl font-bold logoFont sm:pl-3'><span className='md'>One_Media</span></h1>
                    <RxCross1 className='block sm:hidden text-4xl' onClick={() => {
                        setSidebar(!sidebar)
                    }} />
                </div>
                <div className='flex bg-gray-100 dark:bg-slate-800 items-center gap-5 mx-5 rounded-2xl h-15 hover:outline'>
                    <input type="text" className='w-[80%] outline-none px-5' placeholder='Search...' />
                    <IoSearch className={'text-2xl md:translate-x-0' + (sidebar ? '' : ' -translate-x-2')} />
                </div>
                <div className='h-[80%] overflow-y-auto px-4'>
                    {user.map(() => (
                        <User sidebar={sidebar} setSidebar={setSidebar} />
                    ))}
                </div>
                <div className='px-4 py-1 flex items-center gap-3 border-t border-t-gray-500'>
                    <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg" alt="profile" className='size-11 rounded-full overflow-hidden flex-shrink-0' />
                    <div className={'lg:block' + (sidebar ? '' : ' hidden')} >
                        <h1>Full name</h1>
                        <h3 className='text-sm text-gray-600 line-clamp-1'>Fullname@gmail.com</h3>
                    </div>
                    <button onClick={() => {
                        logout();
                        navigate('/login');
                    }} className={'bg-red-600 sm:block text-white text-sm font-bold py-2 px-5 rounded-2xl hover:bg-red-500 cursor-pointer text-md active:scale-[0.95] ml-auto' + (sidebar ? '' : ' hidden')}>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
