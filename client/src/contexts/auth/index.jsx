import React, { createContext, useState } from 'react'
import { signUp } from '../../api/auth';
import { isAxiosError } from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [message, setMessage] = useState('');

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
    const values = {
        handleSignUp,
        message
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

