import { useState } from 'react'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import styles from '../styles/Register-style'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../firebase'
import { useDispatch } from 'react-redux'
import { openSnackbar } from '../slices/snackbarSlice'
import { getImageId, register } from '../api/authAPI'


export default function Register({ handleTab, isLoading, setIsLoading }) {
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
    pic: null
  })
  const [ showPassword, setShowPassword ] = useState(false)
  const [ formFeedback, setFormFeedback ] = useState({
    name: '',
    email: '',
    password: '',
    pic: ''
  })
  const dispatch = useDispatch()

  
  const handleShowPassword = () => setShowPassword(prevState => !prevState)
  const handleChange = (event) => {
    setFormFeedback(prevFormFeedback => ({ ...prevFormFeedback, [event.target.name]: '' }))
    if (event.target.name === 'pic') {
      setFormData(prevFormData => ({ ...prevFormData, pic: event.target.files[0] }))
    }
    else {
      const { name, value } = event.target
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    }
  }
  const submitForm = async () => {
    setIsLoading(true)
    let imageId
    let doneWithFirebase = false
    let uploadedToFirebase = false
    try {
      if (!!formData.pic) {
        imageId = (await getImageId()).data.id
        const storageRef = ref(storage, `images/${imageId}`)
        await uploadBytes(storageRef, formData.pic)
        const downloadURL = await getDownloadURL(storageRef)
        uploadedToFirebase = true
        doneWithFirebase = true
        await register({ ...formData, pic: downloadURL })
      }
      else {
        doneWithFirebase = true
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      }
      dispatch(openSnackbar({ mode: 'success', message: 'Your account has been registered successfully!' }))
      handleTab()
    }
    catch(err) {
      if (doneWithFirebase) {
        if (uploadedToFirebase) {
          try {
            await deleteObject(ref(storage, `images/${imageId}`))
          }
          catch(err) {
            dispatch(openSnackbar({ mode: 'error', message: 'An error has occured, please try again!' }))
          }
        }

        const error = err.response.data.error
        if (err.response.status === 500) {
          dispatch(openSnackbar({ mode: 'error', message: error }))
        }
        else {
          setFormFeedback(prevFormFeedback => {
            let newFormFeedback = {}
            Object.entries(error).forEach(([ key, value ]) => {
              newFormFeedback = { ...newFormFeedback, [key]: value }
            })
            return { ...prevFormFeedback, ...newFormFeedback }
          })
        }
      }
      else {
        setFormFeedback(prevFormFeedback => {
          return { ...prevFormFeedback, pic: 'The image should not exceed 30MB!' }  
        })
      }
    }
    setIsLoading(false)
  }

  return (
    <Container>
      <FormControl sx={styles.formControl} error={!!formFeedback.name}>
        <InputLabel htmlFor="name" color="secondary" sx={styles.input}>Name</InputLabel>
        <OutlinedInput
          id="name"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          color="secondary"
          aria-describedby="name-feedback"
          sx={styles.input}
        />
        {formFeedback.name && <FormHelperText id="name-feedback" sx={styles.feedback}>
          {formFeedback.name}
        </FormHelperText>}
      </FormControl>
      <FormControl sx={styles.formControl} error={!!formFeedback.email}>
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
        {formFeedback.email && <FormHelperText id="email-feedback" sx={styles.feedback}>
          {formFeedback.email}
        </FormHelperText>}
      </FormControl>
      <FormControl sx={styles.formControl} error={!!formFeedback.password}>
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
        {formFeedback.password && <FormHelperText id="password-feedback" sx={styles.feedback}>
          {formFeedback.password}
        </FormHelperText>}
      </FormControl>
      <FormControl sx={styles.formControl} error={!!formFeedback.pic}>
        <FormHelperText id="avatar-feedback" sx={styles.label}>
          Upload Your Avatar Image (Optional)
        </FormHelperText>
        <input
          accept="image/*"
          id="avatar"
          type="file"
          name="pic"
          onChange={handleChange}
          aria-describedby="avatar-feedback"
        />
        {formFeedback.pic && <FormHelperText id="avatar-feedback" sx={styles.feedback}>
          {formFeedback.pic}
        </FormHelperText>}
      </FormControl>
      <Box sx={styles.info}>
        Already have an account? <Link sx={styles.link} onClick={handleTab}>Log in</Link> now!
      </Box>
      {!isLoading && <Button 
        variant="contained"
        color="secondary"
        size="large"
        onClick={submitForm}
        sx={styles.button}
      >
        Sign Up
      </Button>}
      {isLoading && <Button variant="outlined" color="secondary" size="small" sx={styles.loading}>
        <CircularProgress color="inherit" size={35} />
      </Button>}
    </Container>
  )
}