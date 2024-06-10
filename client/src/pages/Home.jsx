import React, { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

const Home = () => {
    const { currentUser } = useContext(AuthContext) 
  return (
    <div>
        Hello {currentUser?.name}, you are logged in with {currentUser?.email}
    </div>
  )
}

export default Home