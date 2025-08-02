import { IoMdHome } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegCompass } from "react-icons/fa";
import { TfiVideoClapper } from "react-icons/tfi";
import { TiMessages } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";

import DefaultProfile from '../assets/DefaultProfile.png';

import { Link } from 'react-router';
import { useAuth } from '../context/Auth.context';

import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate();

    const { logout } = useAuth();
    return (
        <div className="sidebar h-screen py-5 overflow-auto pl-5 pr-3 sm:pr-10 flex flex-col justify-between gap-10 border-r border-r-black/50 dark:border-r-gray-500">
            <div>
                <h1 className='text-3xl font-bold mb-10 logoFont sm:pl-3'><span className='hidden sm:block'>One_Media</span><span className='block sm:hidden'>O</span></h1>
                <ul className='flex flex-col gap-3'>
                    <Link to='/' className='sidenavLinks'>
                        <IoMdHome className='text-3xl' />
                        <li>Home</li>
                    </Link>
                    <Link to='' className='sidenavLinks'>
                        <FaMagnifyingGlass className='text-2xl' />
                        <li>Search</li>
                    </Link>
                    <Link to='' className='sidenavLinks'>
                        <FaRegCompass className='text-2xl' />
                        <li>Explore</li>
                    </Link>
                    <Link to='' className='sidenavLinks'>
                        <TfiVideoClapper className='text-xl' />
                        <li>Reels</li>
                    </Link>
                    <Link to='/messages' className='sidenavLinks'>
                        <TiMessages className='text-2xl' />
                        <li>Messages</li>
                    </Link>
                    <Link to='' className='sidenavLinks'>
                        <FaRegHeart className='text-2xl ' />
                        <li>Notifications</li>
                    </Link>
                    <Link to='' className='sidenavLinks'>
                        <FaRegPlusSquare className='text-2xl' />
                        <li>create</li>
                    </Link>
                    <Link to='' className='sidenavLinks'>
                        <img src={DefaultProfile} className='w-8 rounded-full ' alt="" />
                        <li>Profile</li>
                    </Link>
                </ul>
            </div>
            <button onClick={() => {
                logout();
                navigate('/login');
            }} className='bg-red-600 hidden sm:block text-white font-bold py-2 px-5 rounded-2xl hover:bg-red-500 cursor-pointer text-md active:scale-[0.95]'>Log out</button>
        </div>
    )
}

export default Sidebar
