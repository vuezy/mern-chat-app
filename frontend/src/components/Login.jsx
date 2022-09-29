import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import styles from '../styles/Login-style'
import { useDispatch } from 'react-redux'
import { openSnackbar } from '../slices/snackbarSlice'
import { loggedIn } from '../slices/userSlice'
import { login } from '../api/authAPI'


export default function Login({ handleTab, isLoading, setIsLoading }) {
  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  })
  const [ showPassword, setShowPassword ] = useState(false)
  const [ invalid, setInvalid ] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleShowPassword = () => setShowPassword(prevState => !prevState)
  const handleChange = (event) => {
    setInvalid(false)
    const { name, value } = event.target
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
  }
  const submitForm = async () => {
    setIsLoading(true)
    try {
      const data = (await login(formData)).data
      dispatch(loggedIn({ user: data.user, token: data.token }))
      dispatch(openSnackbar({ mode: 'success', message: 'You have successfully logged in!' }))
      navigate('/chats', { replace: true })
    }
    catch(err) {
      setInvalid(true)
      dispatch(openSnackbar({ mode: 'error', message: err.response.data.error }))
    }
    setIsLoading(false)
  }

  return (
    <Container>
      <FormControl sx={styles.formControl} error={invalid}>
        <InputLabel htmlFor="email" color="secondary" sx={styles.input}>Email address</InputLabel>
        <OutlinedInput
          id="email"
          label="Email address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          color="secondary"
          aria-describedby="email-feedback"
          sx={styles.input}
        />
      </FormControl>
      <FormControl sx={styles.formControl} error={invalid}>
        <InputLabel htmlFor="password" color="secondary" sx={styles.input}>Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          color="secondary"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          aria-describedby="password-feedback"
          sx={styles.input}
        />
      </FormControl>
      <Box sx={styles.info}>
        Don't have an account? <Link sx={styles.link} onClick={handleTab}>Sign up</Link> now!
      </Box>
      {!isLoading && <Button 
        variant="contained"
        color="secondary"
        size="large"
        onClick={submitForm}
        sx={styles.button}
      >
        Log In
      </Button>}
      {isLoading && <Button variant="outlined" color="secondary" size="small" sx={styles.loading}>
        <CircularProgress color="inherit" size={35} />
      </Button>}
    </Container>
  )
}