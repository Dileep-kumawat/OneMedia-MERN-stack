import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import AuthFooter from '../components/AuthFooter'
import Loader from '../components/Loader'
import { useAuth } from '../context/Auth.context'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      // Replace with your login endpoint
      const res = await axios.post('http://localhost:3000/api/auth/login', form, { withCredentials: true })
      if(res.data.success){
        login(res.data.user);
        toast.success('Login successful!')
        navigate('/')
      }
    } catch (err) {
      setError('Login failed')
      toast.error('Login failed')
    }
    setLoading(false)
  }

  return (
    <div className='dark:bg-slate-950 dark:text-white min-h-screen'>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <form onSubmit={handleSubmit} className='sm:outline-2 px-10 py-5 outline-black dark:outline-white/50 flex mt-10 gap-2 justify-center items-center flex-col'>
          <h1 className='text-4xl font-bold mb-10 logoFont'>One_Media</h1>
          <input name="username" type="text" placeholder='Username' className='outline-none px-5 py-2 dark:bg-slate-900 bg-gray-200 rounded-xl' value={form.username} onChange={handleChange} />
          <input name="password" type="password" placeholder='Password' className='outline-none px-5 py-2 dark:bg-slate-900 bg-gray-200 rounded-xl' value={form.password} onChange={handleChange} />
          <button type="submit" className='bg-[#0069AD] flex justify-center rounded-xl px-5 py-2 font-bold w-full mt-5 cursor-pointer text-white hover:bg-blue-600 active:scale-[0.95]'>
            {loading ? <Loader width="6" /> : "Log in"}
          </button>
          {error && <div className="text-red-500">{error}</div>}
        </form>
        <div className='sm:outline-2 px-10 py-3 outline-black dark:outline-white/50'>Don't have an account? <Link to="/signup" className='text-blue-500 cursor-pointer'>Sign up</Link> </div>
        <AuthFooter />
      </div>
    </div>
  )
}

export default Login