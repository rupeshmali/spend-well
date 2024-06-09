import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { PATHS } from './utils/constants'
import Landing from './pages/Landing'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.LANDING} element={<Landing />} />
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.REGISTER} element={<Register />} />
        <Route path={PATHS.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
