import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { PATHS } from './utils/constants'
import Landing from './pages/Landing'
import { AuthProvider } from './contexts/auth'
import Navbar from './components/common/Navbar'
import Layout from './components/protected/Layout'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path={PATHS.LANDING} element={<Landing />} />
          <Route path={PATHS.HOME} element={<Layout />} >
            <Route index element={<Home />} />
          </Route>
          <Route path={PATHS.REGISTER} element={<Register />} />
          <Route path={PATHS.LOGIN} element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
