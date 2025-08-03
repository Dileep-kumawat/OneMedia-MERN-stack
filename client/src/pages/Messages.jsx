import React from 'react'
import Sidebar from '../components/messages/Sidebar'
import Main from '../components/messages/Main'

const Messages = () => {
    const [sidebar, setSidebar] = React.useState(false);
    return (
        <div className='flex h-screen w-screen dark:bg-slate-950 dark:text-white'>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <Main sidebar={sidebar} setSidebar={setSidebar}/>
        </div>
    )
}

export default Messages
