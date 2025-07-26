import React from 'react'
import { Link } from 'react-router'

const ErrorHandler = () => {
  return (
    <div className='w-full h-screen dark:bg-slate-950 flex flex-col justify-center items-center gap-10 dark:text-white'>
      <div className='text-red-500 font-semibold'>404 error</div>
      <div className='md:text-8xl text-3xl font-bold'>Page Not Found</div>
      <div className='md:text-lg font-semibold'>Sorry, we couldn’t find the page you’re looking for.</div>
      <Link to="/" className='bg-violet-600 text-white font-semibold cursor-pointer rounded-2xl px-5 py-3 hover:bg-violet-500 active:scale-[0.95]'>Go back to Home Page</Link>
    </div>
  )
}

export default ErrorHandler
