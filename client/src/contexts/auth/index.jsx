import React, { createContext, useEffect, useState } from 'react'
import { getMe, signIn, signUp } from '../../api/auth';
import { isAxiosError } from 'axios';
import Login from '../../pages/Login';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utils/local-storage';
import { PATHS, TOKEN_KEY } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const handleSignUp = async (name, email, password) => {
        try {
            if (!name || !email || !password) {
                setMessage("Name, Email and Password are required.");
                return;
            }
            const payload = {
                name,
                email,
                password
            }
            const { data } = await signUp(payload)
            setMessage(data.message)
        } catch (error) {
            let message = 'Something went wrong...'
            if (isAxiosError(error)) {
                message = error.response.data?.message || message;
            }
            setMessage(message);
        }
    }
    const handleSignIn = async (email, password) => {
        try {
            if(!email || !password){
                setMessage("Email and Password is required.")
                return;
            }
            const payload = {   
                email,
                password
            }
            const { data } = await signIn(payload)
            setMessage(data.message)
            setLocalStorage('access_token',data.token)
            setCurrentUser(data.user)
            window.location.href = window.location.origin + PATHS.HOME;
        } catch (error) {
            let message = 'Something went wrong...'
            if (isAxiosError(error)) {
                message = error.response.data?.message || message;
            }
            setMessage(message);
        }
    }
    const handleLogout = () => {
        removeLocalStorage('access_token')
        window.location.href = window.location.origin + PATHS.LOGIN;
    }
    const handleAuth = async () => {
        try {
            const { data } = await getMe()
            setCurrentUser(data.user)
        } catch (error) {
            // setMessage(error.message)
            removeLocalStorage(TOKEN_KEY)
        }
        setLoading(false)
    }
    const values = {
        handleSignUp,
        handleSignIn,
        handleLogout,
        message,
        currentUser
    }
    useEffect(()=>{
        const token = getLocalStorage('access_token')
        if(!token){
            setLoading(false)
            return;
        }
        handleAuth();
    },[])
    if (loading) return (
        <div className="h-screen flex justify-center items-center">Loading...</div>
    )
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

