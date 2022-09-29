import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MySnackbar from './components/MySnackbar'
import MyDialog from './components/MyDialog'
import Authentication from './pages/Authentication'
import Home from './pages/Home'
import { addBearerToken, removeBearerToken } from './api/api'

export default function App() {
  const { isLoggedIn, token } = useSelector(store => store.user)
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    if (token) {
      addBearerToken(token)
    }
    else {
      removeBearerToken()
    }
  }, [token])

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/') {
      navigate('/', { replace: true })
    }
  }, [isLoggedIn, location])

  return (
    <>
      <MySnackbar />
      <MyDialog />
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/chats" element={<Home />} />
      </Routes>
    </>
  )
}