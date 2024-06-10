import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../utils/constants'
import { AuthContext } from '../../contexts/auth'

const Navbar = () => {
    const navigate = useNavigate()
    const { currentUser, handleLogout } = useContext(AuthContext)

    return (
        <div className='flex flex-row justify-between bg-slate-300 p-5'>
            <div className='text-2xl'>SpendWell</div>
                {
                    currentUser ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) :
                        (
                            <div className='flex flex-row gap-5'>
                                <button onClick={() => navigate(PATHS.REGISTER)}>
                                    Register
                                </button>
                                <button onClick={() => navigate(PATHS.LOGIN)}>
                                    Login
                                </button>
                            </div>
                        )
                }
        </div>
    )
}

export default Navbar