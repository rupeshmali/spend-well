import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { message, handleSignIn } = useContext(AuthContext)

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignIn(email, password);
    }

    return (
        <div className='flex flex-col gap-10 p-10 flex-wrap max-w-[300px]'>
            <h1 className='font-bold text-2xl'>Login</h1>
            <div className='text-red font-semibold'>{message}</div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <label htmlFor="">Email: </label><input className='bg-slate-100 border-2' type="text" onChange={handleEmail} />
                <label htmlFor="">Password: </label><input className='bg-slate-100 border-2' type="text" onChange={handlePassword} />
                <button type="submit" className='bg-blue-500 p-2'>Login</button>
            </form>
        </div>
    )
}

export default Login