import { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Login from '../components/Login'
import Register from '../components/Register'
import styles from '../styles/Authentication-style'

export default function Authentication() {
  const [ tab, setTab ] = useState('login')
  const [ isLoading, setIsLoading ] = useState(false)

  const handleTab = (event, value) => {
    if (!isLoading) {
      setTab(value)
    }
  }

  return (
    <Container sx={styles.container}>
      <Box sx={styles.title}>CHIT-CHAT</Box>
      <Container sx={styles.content}>
        <Tabs
          value={tab}
          onChange={handleTab}
          textColor="secondary"
          indicatorColor="secondary"
          centered
          sx={styles.tabs}
        >
          <Tab value="login" label="Log In" sx={styles.tab} />
          <Tab value="register" label="Sign Up" sx={styles.tab} />
        </Tabs>
        {
          tab === 'login' && 
          <Login
            handleTab={(e) => handleTab(e, 'register')}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        }
        {
          tab === 'register' && 
          <Register
            handleTab={(e) => handleTab(e, 'login')}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        }
      </Container>
    </Container>
  )
}
