import React from 'react'
import {GiHamburgerMenu} from "react-icons/gi";

const Main = ({sidebar, setSidebar}) => {
    return (
        <div className=''>
            <GiHamburgerMenu onClick={()=>{
                setSidebar(!sidebar);
            }} className='block sm:hidden'/>
            It's main messages container.
        </div>
    )
}

export default Main
