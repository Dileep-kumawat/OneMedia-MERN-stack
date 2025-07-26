import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';
import { useAuth } from '../context/Auth.context';




import VideoUploader from './VideoUploader';




import { IoMdHome } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegCompass } from "react-icons/fa";
import { TfiVideoClapper } from "react-icons/tfi";
import { TiMessages } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";

import DefaultProfile from '../assets/DefaultProfile.png';
import Demo1 from '../assets/demo1.jpg'
import Demo2 from '../assets/demo2.webp'
import Demo3 from '../assets/demo3.mp4'
import Demo4 from '../assets/demo4.mp4'
import Demo5 from '../assets/demo5.mp4'
import Demo6 from '../assets/demo6.mp4'
import Demo7 from '../assets/demo7.mp4'
import Demo8 from '../assets/demo8.mp4'
import Profile1 from '../assets/Profile1.jpeg'
import Profile2 from '../assets/Profile2.jpeg'
import Profile3 from '../assets/Profile3.jpeg'
import Profile4 from '../assets/Profile4.jpeg'
import Profile5 from '../assets/Profile5.jpeg'
import Profile6 from '../assets/Profile6.jpeg'
import Profile7 from '../assets/Profile7.jpeg'
import Profile8 from '../assets/Profile8.jpeg'

const Home = () => {
  const FakeData = [
    {
      "username": "traveljunkie",
      "duration": "2h",
      "description": "Sunset over the Grand Canyon 🌄 #nature #wanderlust",
      "likes": 230,
      "comments": 14
    },
    {
      "username": "tech_guru",
      "duration": "1d",
      "description": "Unboxing the latest VR headset! Review coming soon 🎮🕶️",
      "likes": 870,
      "comments": 122
    },
    {
      "username": "fitnessqueen",
      "duration": "3d",
      "description": "Post-leg day feels 😩🔥 #fitnessmotivation",
      "likes": 640,
      "comments": 57
    },
    {
      "username": "chef_bobby",
      "duration": "1w",
      "description": "Tried making sushi at home... turned out better than expected 🍣",
      "likes": 413,
      "comments": 31
    },
    {
      "username": "minimal_moods",
      "duration": "5h",
      "description": "Clean lines and neutral tones. Love this aesthetic 🖤🤍 #minimalism",
      "likes": 198,
      "comments": 11
    },
    {
      "username": "booknerd42",
      "duration": "2d",
      "description": "Finished 'The Midnight Library' and my heart is full 📚✨ #bookrecommendation",
      "likes": 325,
      "comments": 25
    },
    {
      "username": "urbanrider",
      "duration": "6h",
      "description": "Morning ride through downtown—city vibes + fresh air 🚴‍♂️🌆",
      "likes": 276,
      "comments": 19
    },
    {
      "username": "plantmomma",
      "duration": "4d",
      "description": "My monstera finally split a new leaf! 🌱🪴 #plantparent",
      "likes": 489,
      "comments": 44
    }
  ];

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [mutedStates, setMutedStates] = useState(
    new Array(FakeData.length).fill(true)
  );

  const videoRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  useEffect(() => {
    axios.get('https://one-media-back-end.vercel.app/api/auth/profile', { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate('/login'); // Redirect if not authenticated
      });
  }, [navigate]);

  useEffect(() => {
    if (videoRefs.current.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setMutedStates((prevMutedStates) => {
          const updatedMutedStates = [...prevMutedStates];
          entries.forEach((entry) => {
            const index = videoRefs.current.indexOf(entry.target);
            const video = entry.target;
            if (index !== -1 && video) {
              if (entry.isIntersecting) {
                video.play();
                updatedMutedStates[index] = false;
              } else {
                video.pause();
                updatedMutedStates[index] = true;
              }
            }
          });
          return updatedMutedStates;
        });
      },
      {
        threshold: 0.5,
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [FakeData.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-slate-950">
        <Loader width={10} />
      </div>
    );
  }

  const DemoAssets = [Demo1, Demo2, Demo3, Demo4, Demo5, Demo6, Demo7, Demo8];
  const ProfileAssets = [Profile1, Profile2, Profile3, Profile4, Profile5, Profile6, Profile7, Profile8];
  videoRefs.current = [];
  const reelSection = FakeData.map((val, valIndex) => {
    const media = DemoAssets[valIndex];
    const profileImage = ProfileAssets[valIndex];
    const isVideo = media.endsWith('.mp4');

    return (
      <div key={valIndex} className={`post-${valIndex} space-y-5`}>
        <div className='flex gap-3 items-center'>
          <img src={profileImage} alt="" className='rounded-full w-10 h-10' />
          <h1 className='flex gap-2 items-center'>
            <span>{val.username}</span>•
            <span className='text-gray-400'>{val.duration}</span>
          </h1>
        </div>
        <div className='sm:outline outline-gray-500 max-w-full sm:max-w-[80%] object-center'>
          {isVideo ? (
            <div className='relative'>
              <video
                ref={el => videoRefs.current[valIndex] = el}
                src={media}
                autoPlay
                loop
                muted={mutedStates[valIndex]}
                playsInline
                className="w-full rounded-lg"
                onClick={(e) => {
                  const video = e.currentTarget;
                  if (video.paused) {
                    video.play();
                  } else {
                    video.pause();
                  }
                }}
              ></video>
              <div
                className='absolute bottom-5 right-5 p-2 rounded-full bg-black/50 text-white cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering video click
                  const updatedStates = [...mutedStates];
                  updatedStates[valIndex] = !updatedStates[valIndex];
                  setMutedStates(updatedStates);
                }}
              >
                {mutedStates[valIndex] ? (
                  <HiOutlineSpeakerXMark className='text-lg sm:text-3xl' />
                ) : (
                  <HiOutlineSpeakerWave className='text-lg sm:text-3xl' />
                )}
              </div>
            </div>

          ) : (
            <img src={media} alt={`Demo ${valIndex + 1}`} />
          )}
        </div>
        <div className='space-y-2'>
          <h4>{val.description}</h4>
          <div className='flex gap-5 items-center'>
            <span className='flex gap-2 items-center text-lg'><FaRegHeart className='cursor-pointer' /> {val.likes}</span>
            <span className='flex gap-2 items-center text-lg'><FaRegComment className='cursor-pointer' /> {val.comments}</span>
          </div>
        </div>
      </div>
    );

  })

  const footerTags = [
    "About",
    "Help",
    "Press",
    "API",
    "Jobs",
    "Privacy",
    "Terms",
    "Locations",
    "Language",
    "Meta Verified"
  ]
  const Footer = footerTags.map((val, valIndex) => {
    return (
      <li key={valIndex} className='text-gray-500 text-sm cursor-pointer hover:underline hover:text-black dark:hover:text-white'>
        {val}
      </li>
    )
  })

  return (
    <>
      <div className='w-full h-screen overflow-hidden dark:bg-slate-950 dark:text-white flex '>
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
              <Link to='' className='sidenavLinks'>
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
        <main className='grid md:grid-cols-3 grid-cols-2 w-full'>
          <div className='col-span-2 w-full sm:p-15 p-5 space-y-15 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            <h4 className='w-full text-center text-2xl'>Suggested Posts : </h4>
            {reelSection}
            {/* <VideoUploader /> */}
          </div>
          <div className='w-full hidden md:block p-10 space-y-10'>
            <div className="card flex gap-5 items-center lg:min-w-1/2 min:w-full">
              <img src={DefaultProfile} alt="" className='rounded-full size-11' />
              <div className="">
                <h1 className='font-bold'>{user?.fullname || 'Profile name'}</h1>
                <p className='text-gray-500'>{user?.email || 'Email'}</p>
              </div>
            </div>
            <ul className='footer gap-3 flex flex-wrap w-1/2 gap-y-1'>
              {Footer}
            </ul>
            <div className='text-gray-400 space-y-3'>
              <div className='text-sm '>
                The Github profile Link :
                <a href="https://github.com/Dileep-kumawat" target='_blank' className='text-blue-400 cursor-pointer hover:underline'> Dileep_kumawat</a>
              </div>
              <div className='text-sm '>
                The Project front-end part Link :
                <a href="https://github.com/Dileep-kumawat" target='_blank' className='text-blue-400 cursor-pointer hover:underline'> Front-end</a>
              </div>
              <div className='text-sm '>
                The Project back-end part Link :
                <a href="https://github.com/Dileep-kumawat" target='_blank' className='text-blue-400 cursor-pointer hover:underline'> Back-end</a>
              </div>
              <div>
                The Linkedin Profile : 
                <a href="https://www.linkedin.com/in/dileep-kumawat/" target='_blank' className='text-blue-400 cursor-pointer hover:underline'> LinkedIn</a>
              </div>
            </div>
            <div className='text-gray-500 text-sm'>© 2025 One_Media from Dileep</div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
