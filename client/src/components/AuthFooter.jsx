import React from 'react'
import appStoreLogo from '../assets/playstore.png'
import MsLogo from '../assets/microsoft.png'

const AuthFooter = () => {

    const tags = ["Meta",
        "About",
        "Blog",
        "Jobs",
        "Help",
        "API",
        "Privacy",
        "Terms",
        "Locations",
        "One_media Lite",
        "Threads",
        "Contact Uploading & Non-Users",
        "Meta Verified"];
    const tagsComponent = tags.map((val, valIndex) => {
        return (
            <li key={valIndex} className='text-gray-600 cursor-pointer hover:underline hover:text-white'>{val}</li>
        )
    })
    return (
        <>
            <div className='max-w-70 flex flex-col justify-center items-center gap-5'>
                <h4>Get my app.</h4>
                <div className='flex gap-5'>
                    <img src={appStoreLogo} className='cursor-pointer w-40 h-10' alt="This is a image" />
                    <img src={MsLogo} className='cursor-pointer w-40 h-10' alt="This is a image" />
                </div>
                <div className='sm:w-[80vw] my-10 flex flex-col gap-10 justify-center items-center'>
                    <ul className='flex flex-wrap gap-2'>{tagsComponent}</ul>
                    <h4>English | © 2025 OneMedia from Dileep</h4>
                </div>
            </div>
        </>
    )
}

export default AuthFooter
